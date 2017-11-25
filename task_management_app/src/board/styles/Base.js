import styled from "styled-components";

export const BoardDiv = styled.div`
  background-color: #fff;
  overflow-y: hidden;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  font: 14px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`;

export const Section = styled.div`
  background-color: #e3e3e3;
  border-radius: 1px;
  margin: 2px 2px;
  min-width: 400px;
  height: auto;
`;

export const SectionHeader = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
`;
export const SectionContent = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  max-height: 75vh;
  overflow-y: auto;
`;

export const SectionFooter = styled.div`padding: 5px;`;
export const Header = styled.header`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 12px;
  padding-top: 5px;
  line-height: 15px;
  width: 80%;
`;

export const RightContent = styled.span`
  width: 30%;
  text-align: right;
  font-size: 12px;
`;

export const DraggableList = styled.div`min-height: 100px;`;

export const CardWrapper = styled.article`
  border-radius: 1px;
  margin: 10px 0px;
  border-bottom: 1px solid #ccc;
  padding: 2px 4px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
  background-color: #fff;
  max-width: 400px;

  &:hover {
    background-color: #f0f0f0;
  }

  &.is-moving {
    background-color: rgba(black, 0.8);
  }
`;

export const Placeholder = styled.section`
  background-color: #ccc;
  margin: 5px 0px;
  padding: 5px;
  min-width: 226px;
  height: 45px;
  max-height: 95%;
  overflow-y: auto;
`;

export const CardHeader = styled(Header)`
  font-size: 10px;
  padding: 2px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const CardTitle = styled.div`
  font-size: 10px;
  font-weight: bold;
`;

export const CardRightContent = styled(RightContent)`
  font-size: 10px;
`;

export const Detail = styled.div`
  font-size: 14px;
  padding: 5px;
  color: #4d4d4d;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  min-height: 36px;
`;

export const Footer = styled.div`
  font-size: 10px;
  border-top: 1px solid #eee;
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const HeaderItem = styled.div`padding: 1px;`;

export const TagSpan = styled.span`
  padding: 2px 3px;
  font-size: 80%;
  border-radius: 3px;
  margin: 2px 5px;
  font-size: 70%;
`;

export const EditBox = styled.div`
  font-size: 8px;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Paginate = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;
