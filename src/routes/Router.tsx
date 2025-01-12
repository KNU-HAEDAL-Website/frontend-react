import { BrowserRouter, Outlet, Route, Routes } from 'react-router'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>g</div>} />
        <Route path="/auth">
          <Route path="login" element={<div>1</div>} />
          <Route path="signup" element={<div>2</div>} />
        </Route>
        <Route path="/admin">
          <Route path="member" element={<div>1</div>} />
          <Route path="semester" element={<div>2</div>} />
        </Route>
        <Route path="/activity">
          <Route path=":semesterId" element={<Outlet />}>
            <Route path=":activityId" element={<div>2</div>} />
          </Route>
        </Route>
        <Route path="/activity/:activityId">
          <Route path="boards/:boardId" element={<div>1</div>} />
          <Route path="create-board" element={<div>2</div>} />
        </Route>
        <Route path="/boards/:boardId">
          <Route path="posts/:postId" element={<div>1</div>} />
          <Route path="create-post" element={<div>2</div>} />
        </Route>
        <Route path="/event" element={<div>1</div>} />
        <Route path="/event/create-post" element={<div>2</div>} />
        <Route path="/event/posts/:postId" element={<div>3</div>} />
        <Route path="/notice" element={<div>1</div>} />
        <Route path="/notice/create-post" element={<div>2</div>} />
        <Route path="/notice/posts/:postId" element={<div>3</div>} />
        <Route path="/member" element={<div>1</div>} />
        <Route path="/mypage" element={<div>1</div>} />
        <Route path="/recruit" element={<div>1</div>} />
        <Route path="/*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
