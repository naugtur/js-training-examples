import React from "react"
import ReactDOM from "react-dom"

const SomeComponent = ((catchMeIfYouCan) => {
    return ((catchMeIfYouCan, props) => (
        <div className="list x">
            {props.items.map((item, number) => {
                const singleItem = (
                    <div key={number} className="lookItsMe">
                        {item.field}
                    </div>
                );
                catchMeIfYouCan.push(singleItem)
                return singleItem
            })}
        </div>
    )).bind(null, catchMeIfYouCan)
})([])

function generate(){
return Array(999).join(',').split(',').map(() => ({field: Math.random().toFixed(8)}))
}

function drawEverything() {
    const items = generate()
    ReactDOM.render(
        <div className="app">
        <button onClick={drawEverything}>refresh</button>
        <SomeComponent items={items}/>
    </div>, document.querySelector(".main"))
}

drawEverything()
