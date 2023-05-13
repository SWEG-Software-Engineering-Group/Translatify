import { act } from "react-dom/test-utils";
import { useAuth } from "./useAuth";
import { Auth } from "aws-amplify";
import { renderHook } from "@testing-library/react";

jest.mock("aws-amplify");

const mockedAuth = Auth as jest.Mocked<typeof Auth>;

describe("useProvideAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(undefined);
    expect(result.current.idTokenAPI).toBe(undefined);
    expect(result.current.user).toBe(undefined);
    expect(result.current.tenant).toBe(undefined);
  });

  it("authenticates user and sets state accordingly", async () => {
    const mockUser = {
      username: "testuser",
      attributes: {
        email: "testuser@test.com",
      },
      signInUserSession: {
        idToken: {
          jwtToken: "token",
          payload: {
            "cognito:groups": ["admin"],
          },
        },
      },
    };
    mockedAuth.currentAuthenticatedUser.mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
        expect(result.current.isAuthenticated).toBe(undefined);
        expect(result.current.idTokenAPI).toBe(undefined);
        expect(result.current.user).toBe(undefined);
        expect(result.current.tenant).toBe(undefined);
    });
  });

  it("logs in user and sets state accordingly", async () => {
    const mockUser = {
      username: "testuser",
      attributes: {
        email: "testuser@test.com",
        "custom:surname": "Test",
      },
      signInUserSession: {
        idToken: {
          jwtToken: "token",
          payload: {
            "cognito:groups": ["user"],
          },
        },
      },
    };
    const mockTenant = {
      id: "1",
      tenantName: "test",
      defaultLanguage: "en",
    };
    mockedAuth.signIn.mockResolvedValueOnce(mockUser);
    global.localStorage.setItem("tenant", JSON.stringify(mockTenant));
    const { result } = renderHook(() => useAuth());

    expect(result.current.idTokenAPI).toBe(undefined);
    expect(result.current.user).toBe(undefined);
    expect(result.current.tenant).toBe(undefined);
  });
});