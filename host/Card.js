import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import ItemTypes from './ItemTypes'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'


const mapStateToProps = ()=> {
}

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;//dragÇ≥ÇÍÇƒÇÈóvëfÇÃindexÇéÊìæ
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;//çÇÇ≥äÑÇQ

    const clientOffset = monitor.getClientOffset();//dropÇµÇƒÇ¢ÇΩç≈å„ÇÃç¿ïW

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
}

function dragCollect(connect, monitor){
	return {
		 connectDragSource: connect.dragSource(),
  		 isDragging: monitor.isDragging()
	}
}

function dropCollect(connect, monitor){
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

class Card extends Component{
	render(){
	    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
				
		            	<div style={{ ...style, opacity }}>
		              		{text}
	            		</div>
		));
	}
}

Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

export default connect(mapStateToProps)(Card)
const x = DropTarget(ItemTypes.CARD, cardTarget, dropCollect)(Card) 
export default DragSource(ItemTypes.CARD, cardSource, dragCollect)(x)

