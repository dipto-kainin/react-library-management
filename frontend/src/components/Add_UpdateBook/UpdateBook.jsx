import React from 'react'
import './Add_UpdateBook.css'



function Update() {

    return (
<div className="book">
        <form action="" className="form_main">
        <div className="inputContainer">
        <input type="text" className="inputField" id="bookname" placeholder="Book name"/>
        </div>
    <div className="inputContainer">
        <input type="text" className="inputField" id="authername" placeholder="Auther name"/>
    </div>
    <div className="inputContainer">
        <input type="text" className="inputField" id="typeofbook" placeholder="Genre"/>
    </div>          
    <div className="inputContainer">
        <input type="text" className="inputField" id="isbnpre" placeholder="Isbn pre"/>
    </div> 
    <div className="inputContainer">
        <input type="text" className="inputField" id="description" placeholder="Description"/>
    </div> 
    <input id="checkboxInput" type="checkbox"/>
    <label className="toggleSwitch" for="checkboxInput">
    </label>
<p></p>
<div class="button-container">
<button className="button">Back</button>
<button className="button">Save</button>
<button className="cancel_button">Cancel </button>
</div>
    </form>
    </div>
    );
}

export default Update;