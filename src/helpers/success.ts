import { IEndpointResponse } from "../interfaces/success";

export const endpointResponse = ({
  res,
  code = 200,
  status = true,
  message,
  body,
}: IEndpointResponse) => {
  res.status(code).json({
    status,
    code,
    message,
    body,
  });
};

module.exports = {
  endpointResponse,
};
