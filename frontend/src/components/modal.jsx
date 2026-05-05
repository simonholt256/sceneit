
function Modal({input}) {

    function ModalClose() {

    }

    if (input == "rate-seen") {
        return (
            <div className="modal-container">
                <div>Movie title</div>
                <form>
                    <label htmlFor="rating-number">rating (0-10)</label>
                    <input type="range" id="rating-number" name="rating number" min="0" max="10"></input>
                    <br></br>
                    <label htmlFor="comments">Any comments</label>
                    <input type="text" />
                    <br></br>
                    <button onClick={ModalClose}>Add to seen movies</button>
                </form>
                
            </div>
            
        )
    } else if (input == "rate-want") {
        return (
            <div className="modal-container">
                <div>Movie title</div>
                <form>
                    <label htmlFor="priority">priority to watch (0-10)</label>
                    <input type="range" id="priority" name="priority" min="0" max="10"></input>
                    <button onClick={ModalClose}>Add to seen movies</button>
                </form>
                
            </div>
        )
    }
}

// rate-seen, rate-want, 

export default Modal

