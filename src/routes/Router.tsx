import { BrowserRouter, Outlet, Route, Routes } from 'react-router'

import {
  ActivityBoardPage,
  ActivityPage,
  ActivityPostPage,
  AdminMemberPage,
  AdminSemesterPage,
  CreateActivityPostPage,
  CreateBoardPage,
  CreateEventPostPage,
  CreateNoticePostPage,
  EventPage,
  EventPostPage,
  LoginPage,
  MainPage,
  MemberPage,
  MyPage,
  NotFoundPage,
  NoticePage,
  NoticePostPage,
  RecruitPage,
  SignupPage,
} from '@/pages'

import { AuthRoute } from './custom-route'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin">
          <Route path="member" element={<AdminMemberPage />} />
          <Route path="semester" element={<AdminSemesterPage />} />
        </Route>
        <Route path="/activity">
          <Route path=":semesterId" element={<Outlet />}>
            <Route path=":activityId" element={<ActivityPage />} />
          </Route>
        </Route>
        <Route path="/activity/:activityId">
          <Route path="boards/:boardId" element={<ActivityBoardPage />} />
          <Route path="create-board" element={<CreateBoardPage />} />
        </Route>
        <Route path="/boards/:boardId">
          <Route path="posts/:postId" element={<ActivityPostPage />} />
          <Route path="create-post" element={<CreateActivityPostPage />} />
        </Route>
        <Route path="/event">
          <Route index element={<EventPage />} />
          <Route path="posts/:postId" element={<EventPostPage />} />
          <Route path="create-post" element={<CreateEventPostPage />} />
        </Route>
        <Route path="/notice">
          <Route index element={<NoticePage />} />
          <Route path="posts/:postId" element={<NoticePostPage />} />
          <Route path="create-post" element={<CreateNoticePostPage />} />
        </Route>
        <Route path="/member" element={<MemberPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/recruit" element={<RecruitPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
