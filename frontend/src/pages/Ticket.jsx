import { useSelector, useDispatch } from "react-redux";
import { closeTicket, getTicket, reset } from "../features/tickets/ticketSlice";
import {createNote, getNotes,reset as noteReset} from '../features/notes/noteSlice'
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import NoteItem from "../components/NoteItem";
import Modal from 'react-modal'
import { FaPlus } from "react-icons/fa";

const customStyle= {
  constent:{
    width:'600px',
    top:'50%',
    left:'50%',
    right:'auto',
    bottom:'auto',
    marginRight:'-50%',
    transform:'translate(-50%,-50%)',
    position:'relative',
  }
}
Modal.setAppElement('#root')
function Ticket() {
  const [modalisOpen,setModalIsOpen]=useState(false)
  const [noteText,setNoteText]=useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const { notes, isLoading:notesIsLoaiding} = useSelector((state) => state.notes);
  const params = useParams();
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // we cant add dispatch here in dependencies
  }, [isError, message, ticketId]);
  const onTicketClose=()=>{
    dispatch(closeTicket())
    toast.success('Ticket Closed')
    navigate('/tickets')
  }
  const onNoteSubmit=(e)=>{
    e.preventDefault();
    console.log(ticketId);
    dispatch(createNote(noteText,ticketId))
    closeModal()
  }
  const openModal=()=>setModalIsOpen(true)
  const closeModal=()=>setModalIsOpen(false)
  if (isLoading  || notesIsLoaiding) return <Spinner />;
  if (isError) return <h3>something went wrong</h3>;
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />

        <h2>
          Ticket ID : {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>
          Product : {ticket.product}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status != 'closed' && (<button onClick={openModal} className="btn">add note <FaPlus/> </button>)}
      <Modal isOpen={modalisOpen} onRequestClose={closeModal} style={customStyle} contentLabel="add note" >
        <h2>add note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className="form-control" placeholder="note text" onChange={(e)=>setNoteText(e.target.value)} value={noteText} ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </Modal>
      {notes.map((note)=>{
        return <NoteItem key={note._id} note={note} />
      })}
      {ticket.status!=='closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  );
}

export default Ticket;
