import { renderHook, act } from 'allBeers/AllBeersStore/node_modules/@testing-library/react-hooks';
import { useRouteParams } from './RouteParamsStore';

let mockPath: string;
delete window.location;
window.location = {
  get pathname() {
    return mockPath;
  }
} as Location;

const render = (pattern: string) => renderHook(() => useRouteParams(pattern));

beforeEach(() => {
  mockPath = '/';
});

describe('useRouteParams', () => {
  it('return params object based on provided pattern', () => {
    mockPath = '/test/1';
    const { result } = render('/test/:id');
    expect(result.current).toEqual({ id: '1' });
  });

  it('return empty object if url maches but no params in pattern', () => {
    const { result } = render('/');
    expect(result.current).toEqual({});
  });

  it('return null if no match', () => {
    const { result } = render('/not/matching/url');
    expect(result.current).toBe(null);
  });

  it('updates on history popstate event', () => {
    const { result } = render('/test');

    act(() => {
      mockPath = '/test';
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current).toEqual({});
  });

  it('not updates on history popstate event after unmount', () => {
    const { result, unmount } = render('/test');

    act(() => {
      mockPath = '/test';
      unmount();
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current).toEqual(null);
  });
});
