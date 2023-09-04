import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useEffect } from "react";
import { getTickets,reset } from "../features/tickets/ticketSlice";
import TicketItem from "../components/TicketItem";

function Tickets() {
    const {tickets,isLoading,isError,message,isSuccess}=useSelector((state)=>state.tickets);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getTickets())
        console.log(tickets);
    },[dispatch])
    useEffect(()=>{
        return ()=>{
            if(isSuccess)
            {
                dispatch(reset())
            }
        }
    },[dispatch,isSuccess])
    if(isLoading) return <Spinner/>

  return (
    <>
        <BackButton url='/' />
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div>{}</div>
            </div>
            {tickets.map((ticket)=>{
                return <TicketItem key={ticket._id} ticket={ticket} />
            })}
        </div>
    </>
  )
}

export default Tickets