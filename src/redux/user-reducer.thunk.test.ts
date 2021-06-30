import { ApiResponseType, ResultCodesEnum } from '../api/api';
import { usersAPI } from './../api/users-api';
import { actions, follow, unfollow } from './users-reducer';

// Создание мокового API, фейкового объекта
jest.mock('./../api/users-api');

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>; // нагугленная типизация фейкового API...

// общая логика выносится наверх модуля
const dispatchMock = jest.fn(); // эммуляция работы функции dispatch, которой ниже указывается место вызова
const getStateMock = jest.fn();

// очистка моковых данных перед каждым запуском теста
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

const result: ApiResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

// создание моковых запросов на сервер
userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test('success follow thunk', async () => {
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  // количество вызовов экшенов
  expect(dispatchMock).toBeCalledTimes(3);

  // с какими объектами вызывались экшены
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('success unfollow thunk', async () => {
  const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});

  // количество вызовов экшенов
  expect(dispatchMock).toBeCalledTimes(3);

  // с какими объектами вызывались экшены
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
