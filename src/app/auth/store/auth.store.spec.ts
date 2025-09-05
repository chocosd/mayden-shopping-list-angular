import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { AuthStore } from './auth.store';

describe('AuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const setup = (delayed = false) => {
    const authApiStub: Partial<AuthApiService> = {
      login: jasmine.createSpy('login').and.callFake((payload: { email: string }) => {
        const token = payload.email.includes('two') ? 'token-two' : 'token-one';
        const source$ = of({ token });
        return delayed ? source$.pipe(delay(100)) : source$;
      }),
      register: jasmine.createSpy('register').and.callFake((payload: { email: string }) => {
        const token = payload.email.includes('new') ? 'token-new' : 'token-registered';
        const source$ = of({ token });
        return delayed ? source$.pipe(delay(100)) : source$;
      }),
    } as unknown as AuthApiService;

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthStore,
        { provide: AuthApiService, useValue: authApiStub },
      ],
    });

    const store = TestBed.inject(AuthStore);
    return { store, authApiStub };
  };

  it('should login and set token (immediate)', () => {
    const { store } = setup(false);
    store.login({ email: 'one@example.com', password: 'secret' });
    expect(store.loading()).toBeFalse();
    expect(store.token()).toBe('token-one');
    expect(localStorage.getItem('auth_token')).toBe('token-one');
  });

  it('should set loading during async login and then set token', async () => {
    const { store } = setup(true);
    store.login({ email: 'one@example.com', password: 'secret' });
    expect(store.loading()).toBeTrue();
    await new Promise((r) => setTimeout(r, 110));
    expect(store.token()).toBe('token-one');
    expect(store.loading()).toBeFalse();
  });

  it('should register and set token', () => {
    const { store } = setup(false);
    store.register({ email: 'new@example.com', password: 'secret' });
    expect(store.token()).toBe('token-new');
    expect(localStorage.getItem('auth_token')).toBe('token-new');
  });
});
