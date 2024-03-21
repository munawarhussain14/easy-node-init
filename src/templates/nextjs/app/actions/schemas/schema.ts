import { z } from "zod";

const **schema_name** = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty(),
});

export { **schema_name** };
