import React, { useState, useEffect } from 'react';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';
import textColorFromBackground from '../helpers/functions/textColorFromBackground';
import { ResponsiveText } from "../components/responsiveText/responsiveTextSize";
import Button from '../components/button/button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';

const parent = document.createElement("div");
parent.classList.add("portal-parent");
document.body.appendChild(parent);

export default function TodoBlock(props) {
    const [todos, setTodos] = useState(getStoredValue(`${props.id}.todos`) || []);

    function newTodo() {
        const newTodos = [...todos, { text: "", checked: false, id: (new Date()).getTime() }];
        setTodos(newTodos);
        setStoredValue(`${props.id}.todos`, JSON.stringify(newTodos));
        console.log(newTodos);
    }
    function updateTodoText(e, index) {
        let newTodos = [...todos];
        newTodos[index].text = e.target.value;
        setTodos(newTodos);
        setStoredValue(`${props.id}.todos`, JSON.stringify(newTodos));
    }
    function updateTodoChecked(e, index) {
        let newTodos = [...todos];
        newTodos[index].checked = e.target.checked;
        setTodos(newTodos);
        setStoredValue(`${props.id}.todos`, JSON.stringify(newTodos));
    }
    function deleteTodoItem(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setStoredValue(`${props.id}.todos`, JSON.stringify(newTodos));
    }


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedTodos = reorder(
            todos,
            result.source.index,
            result.destination.index
        );

        setTodos(reorderedTodos);
        setStoredValue(`${props.id}.todos`, JSON.stringify(reorderedTodos));
    }

    const deleteButtonSize = props.height * .15 > 40 ? 50 : props.height * .15;
    return (
        <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }} >
            <div style={{
                height: "87%",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                paddingTop: "5%",
                width: "90%",
                alignItems: "center",
            }}>
                {todos.length === 0 &&
                    <>
                        <div style={{ color: "gray", paddingTop: "5%", width: "80%", height: "50%" }}>
                            <ResponsiveText >😊</ResponsiveText>
                        </div>
                        <div style={{ color: window.themeColor, width: "50%", height: "10%" }}>
                            <ResponsiveText >You're all caught up</ResponsiveText>
                        </div>
                    </>
                }
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided, snapshot) => (
                            <div
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                            >
                                {todos.map((todo, index) => {
                                    return (
                                        <Draggable key={todo.id} draggableId={String(todo.id)} index={index} style={(_isDragging, draggableStyle) => ({ ...draggableStyle, position: 'static' })}>
                                            {(provided, snapshot) => (
                                                <PortaledElement buttonSize={deleteButtonSize} provided={provided} snapshot={snapshot} todo={todo} index={index} props={props} updateTodoChecked={updateTodoChecked} updateTodoText={updateTodoText} deleteTodoItem={deleteTodoItem} />
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {droppableProvided.placeholder}

                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div style={{ height: "9%", marginBottom: "6%", display: "flex", alignContent: "center", justifyContent: 'center' }}>
                <Button onClick={newTodo} type="WHITE_BACK_THEME_BORDER" size={deleteButtonSize} icon="/assets/plus.svg" />
            </div>
        </div>
    )
}

function PortaledElement({ provided, snapshot, index, todo, props, updateTodoChecked, updateTodoText, deleteTodoItem, buttonSize }) {
    const child = <div key={index}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
            ...provided.draggableProps.style,
            padding: 4
        }}
    >
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "white",
            padding: 5,
            borderRadius: 5,
            border: `${(2 / 30) * buttonSize}px solid ${window.themeColor}`,
        }}>
            <img src="/assets/drag.svg" style={{ width: "17px", transform: "translateX(-5px)", opacity: .8 }} />
            <input onChange={(e) => { updateTodoChecked(e, index) }} type="checkbox" checked={todo.checked}
                style={{
                    // Note the use of sqrt to make the checkbox proportinal the size of the block and ensure it is still readable/viewable at smaller sizes
                    width: Math.sqrt(props.height),
                    height: Math.sqrt(props.height)
                }} />
            <input onChange={(e) => { updateTodoText(e, index) }} type="text" value={todo.text} placeholder="Empty Todo..."
                style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    textDecorationThickness: 2,
                    textDecoration: todo.checked ? "line-through" : "none",
                    width: "100%",
                    textOverflow: "ellipsis",
                    fontSize: Math.sqrt(props.height),
                    marginLeft: 5
                }}
            />
            <Button size={Math.sqrt(props.height)} type="WHITE_BACK" icon="/assets/close.svg" onClick={(e) => { deleteTodoItem(index) }} />
        </div>
    </div>

    return (
        <>
            {snapshot.isDragging ? ReactDOM.createPortal(child, parent) : child}
        </>
    )
}