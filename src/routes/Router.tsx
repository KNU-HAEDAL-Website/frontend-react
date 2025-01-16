import { BrowserRouter, Route, Routes } from 'react-router'

import {
  ActivityBoardPage,
  ActivityPage,
  ActivityPostPage,
  ActivityRedirectPage,
  AdminMemberPage,
  AdminSemesterPage,
  CreateActivityPostPage,
  CreateBoardPage,
  CreateNoticePostPage,
  EditActivityPostPage,
  LoginPage,
  MainPage,
  MemberPage,
  MyPage,
  NotFoundPage,
  NoticePage,
  NoticePostPage,
  RecruitPage,
  SemesterRedirectPage,
  SignupPage,
} from '@/pages'

import { ActivityRoute, AdminRoute, AuthRoute } from './custom-route'
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
          <Route path="/activity" element={<ActivityRoute />}>
            <Route index element={<SemesterRedirectPage />} />
            <Route path=":semesterId" element={<ActivityRedirectPage />} />
            <Route path=":semesterId/:activityId">
              <Route index element={<ActivityPage />} />
              <Route path="create-board" element={<CreateBoardPage />} />
              <Route path="boards/:boardId">
                <Route index element={<ActivityBoardPage />} />
                <Route path="posts/:postId">
                  <Route index element={<ActivityPostPage />} />
                  <Route path="edit" element={<EditActivityPostPage />} />
                </Route>
                <Route
                  path="create-post"
                  element={<CreateActivityPostPage />}
                />
              </Route>
            </Route>
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
