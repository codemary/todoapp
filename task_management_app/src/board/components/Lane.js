import PropTypes from "prop-types";
import React, { Component } from "react";
import Loader from "./Loader";
import Card from "./Card";
import {
  Section,
  SectionHeader,
  SectionContent,
  SectionFooter,
  Header,
  Title,
  RightContent,
  DraggableList,
  Placeholder,
  EditBox
} from "../styles/Base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import update from "react/lib/update";
import { DragType } from "../helpers/DragType";
import { findDOMNode } from "react-dom";
import {
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  PopoverInteractionKind
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";

import { Collapse } from "@blueprintjs/core";

const laneActions = require("../actions/LaneActions");

const CARD_HEIGHT = 66;
const CARD_MARGIN = 10;
const OFFSET_HEIGHT = 15;

class Lane extends Component {
  state = {
    loading: false,
    currentPage: this.props.currentPage,
    cards: this.props.cards,
    placeholderIndex: -1,
    editOpen: false
  };

  handleScroll = evt => {
    const node = evt.target;
    const elemScrolPosition =
      node.scrollHeight - node.scrollTop - node.clientHeight;
    const { onLaneScroll } = this.props;
    if (elemScrolPosition <= 0 && onLaneScroll && !this.state.loading) {
      const { currentPage } = this.state;
      this.setState({ loading: true });
      const nextPage = currentPage + 1;
      onLaneScroll(nextPage, this.props.id).then(moreCards => {
        this.setState({ loading: false });
        this.props.actions.paginateLane({
          laneId: this.props.id,
          newCards: moreCards,
          nextPage: nextPage
        });
      });
    }
  };

  toggleEdit = () => {
    this.setState({ editOpen: !this.state.editOpen });
  };

  sortCards(cards, sortFunction) {
    if (!cards) return [];
    if (!sortFunction) return cards;
    return cards.concat().sort(function(card1, card2) {
      return sortFunction(card1, card2);
    });
  }

  laneDidMount = node => {
    if (node) {
      node.addEventListener("scroll", this.handleScroll);
    }
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  sameCards = (cardsA, cardsB) => {
    return (
      cardsA.length === cardsB.length &&
      cardsA.every((el, ix) => el.id === cardsB[ix].id)
    );
  };

  componentWillReceiveProps(nextProps) {
    if (!this.sameCards(this.props.cards, nextProps.cards)) {
      this.setState({
        cards: nextProps.cards,
        currentPage: nextProps.currentPage
      });
    }
    if (!nextProps.isOver) {
      this.setState({ placeholderIndex: -1 });
    }
  }

  removeCard = (listId, cardId) => {
    this.props.actions.removeCard({ laneId: listId, cardId: cardId });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !this.sameCards(this.props.cards, nextProps.cards) ||
      nextState !== this.state
    );
  }

  renderPaginationItem = ({ item }) => {
    return (
      <button
        key={item}
        className="pt-button pt-minimal pt-small"
        type="button"
      >
        {item}
      </button>
    );
  };

  renderDragContainer = () => {
    const { connectDropTarget, laneSortFunction, onCardClick, id } = this.props;

    const cardList = this.sortCards(
      this.state.cards,
      laneSortFunction
    ).map((card, idx) =>
      <Card
        key={card.id}
        index={idx}
        listId={id}
        draggable={this.props.draggable}
        customCardLayout={this.props.customCardLayout}
        customCard={this.props.children}
        handleDragStart={this.props.handleDragStart}
        handleDragEnd={this.props.handleDragEnd}
        tagStyle={this.props.tagStyle}
        cardStyle={this.props.cardStyle}
        moveCard={this.moveCard}
        removeCard={this.removeCard}
        onClick={() => onCardClick && onCardClick(card.id, card.metadata)}
        checkbox_open={this.state.editOpen}
        {...card}
      />
    );

    if (this.state.placeholderIndex > -1) {
      cardList.splice(
        this.state.placeholderIndex,
        0,
        <Placeholder key="placeholder" />
      );
    }

    return connectDropTarget(
      <div>
        <DraggableList>
          {cardList}
        </DraggableList>
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    const { id, title, label, ...otherProps } = this.props;
    const sortMenu = (
      <Menu>
        <MenuDivider title="Sort" />
        <MenuItem iconName="pulse" text="By Priority" />
        <MenuItem iconName="time" text="By Recently Created" />
        <MenuItem
          iconName="time"
          text="By Recently Updated"
          shouldDismissPopover={false}
        />
      </Menu>
    );
    return (
      <Section>
        <SectionHeader>
          <Header>
            <Title>
              {title}
            </Title>

            <RightContent>
              <button
                className="pt-button pt-minimal pt-small pt-icon-multi-select"
                type="button"
                onClick={this.toggleEdit}
              />
              <Popover
                content={sortMenu}
                position={Position.RIGHT_BOTTOM}
                interactionKind={PopoverInteractionKind.HOVER}
              >
                <button
                  className="pt-button pt-minimal pt-small pt-icon-sort"
                  type="button"
                />
              </Popover>
            </RightContent>
          </Header>
          <Collapse isOpen={this.state.editOpen}>
            <EditBox>
              <button
                className="pt-button pt-minimal pt-small pt-icon-caret-left"
                type="button"
              />

              <Select
                items={["1", "2", "3"]}
                itemRenderer={this.renderPaginationItem}
              >
                <button
                  className="pt-button pt-minimal pt-small pt-icon-caret-down"
                  type="button"
                />
              </Select>

              <button
                className="pt-button pt-minimal pt-small pt-icon-caret-right"
                type="button"
              />

              <button
                className="pt-button pt-minimal pt-small pt-icon-send-to"
                type="button"
              >
                Move
              </button>

              <button
                className="pt-button pt-minimal pt-small pt-icon-follower"
                type="button"
              >
                Assign
              </button>

              <button
                className="pt-button pt-minimal pt-small pt-icon-export"
                type="button"
              >
                Export
              </button>
            </EditBox>
          </Collapse>
        </SectionHeader>
        <SectionContent {...otherProps} key={id} innerRef={this.laneDidMount}>
          <div>
            {this.renderDragContainer()}
            {loading && <Loader />}
          </div>
        </SectionContent>
        <SectionFooter />
      </Section>
    );
  }
}

Lane.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  laneSortFunction: PropTypes.func,
  cards: PropTypes.array,
  label: PropTypes.string,
  onLaneScroll: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func
};

const cardTarget = {
  drop(props, monitor, component) {
    const { id } = props;
    const index = component.state.placeholderIndex;
    const draggedObj = monitor.getItem();
    if (id !== draggedObj.listId) {
      props.actions.addCard({
        laneId: id,
        card: draggedObj.card,
        index
      });
    } else {
      props.actions.updateCards({ laneId: id, cards: component.state.cards });
    }
    component.setState({ placeholderIndex: -1 });
    return {
      listId: id
    };
  },

  hover(props, monitor, component) {
    const { id } = props;
    const draggedObj = monitor.getItem();
    if (id === draggedObj.listId) {
      return;
    }

    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );

    component.setState({ placeholderIndex });

    return monitor.isOver();

    function getPlaceholderIndex(y, scrollY) {
      // shift placeholder if y position more than card height / 2
      const yPos = y - OFFSET_HEIGHT + scrollY;
      let placeholderIndex;
      if (yPos < CARD_HEIGHT / 2) {
        placeholderIndex = -1; // place at the start
      } else {
        placeholderIndex = Math.floor(
          (yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN)
        );
      }
      return placeholderIndex;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(laneActions, dispatch)
});

export default connect(null, mapDispatchToProps)(
  DropTarget(DragType.CARD, cardTarget, collect)(Lane)
);
