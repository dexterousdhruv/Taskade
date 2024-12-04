import { Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard'
import TaskSection from './components/TaskSection'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} >
          <Route path='tasks' element={<TaskSection />} />
        <Route path='*' element={
          <div className='h-full w-full flex pt-[40vh] justify-center text-2xl font-medium text-center text-gray-700'>
            Click "Tasks" tab to view tasks
          </div>
        } />
        </Route>
      </Routes>
    </>

  )
}

export default App
