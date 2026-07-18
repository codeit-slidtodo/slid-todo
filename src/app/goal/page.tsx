import { Task, TaskBoards } from './TaskBoards';
import { GoalSummaryCards } from './GoalSummaryCards';

const TODOS: Task[] = [
  { id: 't1', title: '사용자 데이터 렌더링 구현', done: false },
  { id: 't2', title: '자바스크립트 기초 챕터 3 듣기', done: false },
  { id: 't3', title: '개발 폴더 구조 세팅하기', done: false },
  { id: 't4', title: 'API 연동 테스트', done: false },
  { id: 't5', title: '로그인 페이지 UI 잡기', done: false },
];

const DONES: Task[] = [
  { id: 'd1', title: '프로젝트 기획서 작성', done: true },
  { id: 'd2', title: 'Figma 와이어프레임 완성', done: true },
  { id: 'd3', title: 'Next.js 프로젝트 세팅', done: true },
  { id: 'd4', title: '공통 레이아웃 잡기', done: true },
];

export default function GoalPage() {
  return (
    <main className="mx-auto flex max-w-[1312px] flex-col gap-8 px-8 py-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          체다치즈님의 목표
        </h2>
        <GoalSummaryCards
          title="자바스크립트로 웹 서비스 만들기"
          progress={64}
        />
      </section>
      <section>
        <TaskBoards todos={TODOS} dones={DONES} />
      </section>
    </main>
  );
}
