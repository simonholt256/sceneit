import { createPortal } from "react-dom";
import { useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { useMovieContext } from "../../contexts/MovieContext";

const priorityMap = {
    "": 0,
    urgent: 1,
    soon: 2,
    keen: 3,
    someday: 4,
    never: 5
};

const reversePriorityMap = {
    0: "",
    1: "urgent",
    2: "soon",
    3: "keen",
    4: "someday",
    5: "never"
};

function PriorityModal() {

    const { selectedMovie, isPriorityOpen, closePriorityModal } = useModalContext();
    const { getToWatchMovie, addToToWatch } = useMovieContext();

    const existing = selectedMovie ? getToWatchMovie(selectedMovie.id) : null;

    const [priority, setPriority] = useState(
        existing ? reversePriorityMap[existing.priority] : ""
    );
    const [custom, setCustom] = useState(existing?.custom || "");

    if (!isPriorityOpen || !selectedMovie) return null;

    function save() {
        addToToWatch(
            selectedMovie.id,
            priorityMap[priority],
            custom
        );

        closePriorityModal();
    }

    return createPortal(
        <div className="modal-overlay">
            <div className="priority-modal">

                <h2>{selectedMovie.title}</h2>

                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="">None</option>
                    <option value="urgent">Urgent</option>
                    <option value="soon">Must see soon</option>
                    <option value="keen">fairly keen</option>
                    <option value="someday">Maybe someday</option>
                    <option value="never">Maybe never</option>
                </select>

                <label>Custom Tag</label>
                <select value={custom} onChange={(e) => setCustom(e.target.value)}>
                    <option value="">None</option>
                    <option value="friends">Watch with friends</option>
                    <option value="rewatch">Want to see again</option>
                    <option value="director">Like the director</option>
                    <option value="subtitles">For when I can bear subtitles</option>
                    <option value="curious">Weirdly curious</option>
                </select>

                <button className="button" onClick={save}>Save</button>
                <button className="close-button" onClick={closePriorityModal}>X</button>

            </div>
        </div>,
        document.body
    );
}

export default PriorityModal;