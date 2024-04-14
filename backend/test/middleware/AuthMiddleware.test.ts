import { createRequest, createResponse } from "node-mocks-http";
import { authMiddleware } from "../../src/middleware/AuthMiddleware";

test("AuthMiddleware should return 401 if no token is provided", () => {
  const req = createRequest();
  const res = createResponse();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(res.statusCode).toBe(401);
  expect(res._getData()).toBe("{\"message\":\"Not authorized\"}");
  expect(next).not.toHaveBeenCalled();
});

test("AuthMiddleware should return 401 if token is invalid", () => {
  const req = createRequest({
    headers: {
      authorization: "Bearer invalid_token",
    },
  });
  const res = createResponse();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(res.statusCode).toBe(401);
  expect(res._getData()).toBe("{\"message\":\"Not authorized\"}");
  expect(next).not.toHaveBeenCalled();
});