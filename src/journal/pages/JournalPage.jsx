import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state=> state.journal)

  const onClickNewNote = ()=> {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, labore? Magnam perspiciatis nulla repudiandae, suscipit, quam ullam nemo rerum commodi cumque, praesentium eligendi accusamus voluptatibus sit ducimus. Minus, quas in?</Typography> */}

      {
        (active === null )
        ? <NothingSelectedView />
        : <NoteView /> 
      }
  
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            backgroundColor: 'error.main',
            opacity: 0.9,
          },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
