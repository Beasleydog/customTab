import React, { useState, useEffect } from 'react';
import { getStoredValue, setStoredValue } from '../helpers/functions/storage';
import textColorFromBackground from '../helpers/functions/textColorFromBackground';
import { ResponsiveText } from "../components/responsiveText/responsiveTextSize";
import Button from '../components/button/button';
export default function TodoBlock(props) {
    const [todos, setTodos] = useState(getStoredValue(`${props.id}.todos`) || []);
    console.log(todos);
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
                {todos.map((todo, index) => {
                    return (
                        <div key={index}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                background: "white",
                                // width: "100%",
                                margin: 5,
                                padding: 5,
                                borderRadius: 5
                            }}>
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
                    )
                })}
            </div>
            <div style={{ height: "9%", marginBottom: "6%", display: "flex", alignContent: "center", justifyContent: 'center' }}>
                <Button onClick={newTodo} type="WHITE_BACK_BLACK_SHADOW" size={props.height * .15 > 40 ? 50 : props.height * .15} icon="/assets/plus.svg" />
            </div>
        </div>
    )
}
