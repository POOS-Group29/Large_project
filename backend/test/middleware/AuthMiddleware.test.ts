import jwt from "jsonwebtoken";
import { createRequest, createResponse } from "node-mocks-http";
import { AuthConfig } from "../../src/config/AuthConfig";
import { authMiddleware } from "../../src/middleware/AuthMiddleware";

test("AuthMiddleware should return 401 if no token is provided", () => {
  const req = createRequest();
  const res = createResponse();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(res.statusCode).toBe(401);
  expect(res._getData()).toBe('{"message":"Not authorized"}');
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
  expect(res._getData()).toBe('{"message":"Not authorized"}');
  expect(next).not.toHaveBeenCalled();
});

test("AuthMiddleware should call next if token is valid", () => {
  const validToken = jwt.sign(
    {
      user: {
        _id: "valid_id",
        name: "valid_name",
        email: "valid_email",
      },
    },
    AuthConfig.secret
  );

  const req = createRequest({
    headers: {
      authorization: `Bearer ${validToken}`,
    },
  });
  const res = createResponse();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(req.user).toEqual({
    _id: "valid_id",
    name: "valid_name",
    email: "valid_email",
  });
});
