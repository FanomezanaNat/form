import { z } from 'zod'
const user = z.object({
    message: z.string(),
    contact: z.string().email(),
    appointment_date: z.string().date()
});

export default user;
export type userType = z.infer<typeof user>