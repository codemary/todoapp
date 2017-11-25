import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  CardWrapper,
  CardHeader,
  CardTitle,
  CardRightContent,
  RightContent,
  Detail,
  Footer,
  HeaderItem
} from "../styles/Base";
import {
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  PopoverInteractionKind
} from "@blueprintjs/core";
import { DragType } from "../helpers/DragType";
import { DragSource, DropTarget } from "react-dnd";

import { findDOMNode } from "react-dom";
import ReactHoverObserver from "react-hover-observer";

var flow = require("lodash.flow");

class Card extends Component {
  state = {
    editCard: false,
    editTicketMenuOpen: false
  };
  renderBody = () => {
    if (this.props.customCardLayout) {
      const customCardWithProps = React.cloneElement(this.props.customCard, {
        ...this.props
      });
      return (
        <span>
          {customCardWithProps}
        </span>
      );
    } else {
      const {
        title,
        description,
        label,
        priority,
        attachment_count,
        comment_count,
        checkbox_open
      } = this.props;
      const enable_footer = priority || attachment_count || comment_count;
      const editTicketButtonVisible =
        this.state.editCard || this.state.editTicketMenuOpen;
      const editTicketMenu = (
        <Menu>
          <MenuDivider title="Edit Ticket" />
          <MenuItem iconName="send-to" text="Move" />
          <MenuItem iconName="follower" text="Assign" />
          <MenuItem iconName="property" text="Edit Priority" />
        </Menu>
      );
      return (
        <span>
          <CardHeader>
            <HeaderItem>
              <CardTitle>
                {title}
              </CardTitle>
            </HeaderItem>

            <HeaderItem>
              <span className="pt-icon pt-icon-symbol-square pt-intent-success">
                &nbsp;{priority}
              </span>
            </HeaderItem>
            <HeaderItem>
              <span className="pt-icon pt-icon-paperclip pt-intent-primary">
                &nbsp;{attachment_count}
              </span>
            </HeaderItem>
            <HeaderItem>
              <span className="pt-icon pt-icon-comment pt-intent-primary">
                &nbsp;{comment_count}
              </span>
            </HeaderItem>
            <HeaderItem>
              {label}
            </HeaderItem>
          </CardHeader>
          <Detail>
            {checkbox_open &&
              <label className="pt-control pt-checkbox">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
              </label>}
            <div style={{ width: "95%" }}>
              {description}
            </div>
            {editTicketButtonVisible &&
              <Popover
                content={editTicketMenu}
                position={Position.RIGHT_BOTTOM}
                popoverWillClose={this.onEditTicketMenuWillClose}
                popoverWillOpen={this.onEditTicketMenuWillOpen}
                interactionKind={PopoverInteractionKind.HOVER}
              >
                <button
                  className="pt-button pt-minimal pt-small pt-icon-edit"
                  type="button"
                />
              </Popover>}
          </Detail>
        </span>
      );
    }
  };

  onHoverChanged = ({ isHovering }) => {
    this.setState({
      editCard: isHovering && !this.props.checkbox_open
    });
  };

  onEditTicketMenuWillOpen = () => {
    this.setState({
      editTicketMenuOpen: true
    });
  };

  onEditTicketMenuWillClose = () => {
    this.setState({
      editTicketMenuOpen: false
    });
  };

  render() {
    const {
      id,
      connectDragSource,
      connectDropTarget,
      isDragging,
      cardStyle,
      ...otherProps
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    const background = isDragging ? "#CCC" : "#E3E3E3";

    return connectDragSource(
      connectDropTarget(
        <div style={{ background: background }}>
          <CardWrapper
            key={id}
            data-id={id}
            {...otherProps}
            style={{ ...cardStyle, opacity: opacity }}
          >
            <ReactHoverObserver onHoverChanged={this.onHoverChanged}>
              {this.renderBody()}
            </ReactHoverObserver>
          </CardWrapper>
        </div>
      )
    );
  }
}

const cardSource = {
  canDrag(props) {
    return props.draggable;
  },

  beginDrag(props) {
    props.handleDragStart(props.id, props.listId);
    return {
      id: props.id,
      listId: props.listId,
      index: props.index,
      card: props
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.listId, item.id);
    }
    props.handleDragEnd(
      item.id,
      item.listId,
      dropResult ? dropResult.listId : item.listId
    );
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;

    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

Card.defaultProps = {
  cardStyle: {},
  customCardLayout: false
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  metadata: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  customCardLayout: PropTypes.bool,
  customCard: PropTypes.node
};

export default flow(
  DropTarget(DragType.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(DragType.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);
