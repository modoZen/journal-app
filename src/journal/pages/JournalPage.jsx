import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"


export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, labore? Magnam perspiciatis nulla repudiandae, suscipit, quam ullam nemo rerum commodi cumque, praesentium eligendi accusamus voluptatibus sit ducimus. Minus, quas in?</Typography> */}

      <NothingSelectedView />
      {/* NoteView */}
    </JournalLayout>
  )
}
