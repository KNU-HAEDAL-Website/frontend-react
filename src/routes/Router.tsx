import { BrowserRouter, Outlet, Route, Routes } from 'react-router'

import {
  ActivityBoardPage,
  ActivityPage,
  ActivityPostPage,
  AdminMemberPage,
  AdminSemesterPage,
  CreateActivityPostPage,
  CreateBoardPage,
  CreateNoticePostPage,
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

import { AdminRoute, AuthRoute } from './custom-route'
import { MainRoute } from './custom-route/main'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route element={<MainRoute />}>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="member" element={<AdminMemberPage />} />
            <Route path="semester" element={<AdminSemesterPage />} />
          </Route>
          <Route path="/" element={<MainPage />} />
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
          <Route path="/notice">
            <Route index element={<NoticePage />} />
            <Route path="posts/:postId" element={<NoticePostPage />} />
            <Route path="create-post" element={<CreateNoticePostPage />} />
          </Route>
          <Route path="/member" element={<MemberPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/recruit" element={<RecruitPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
