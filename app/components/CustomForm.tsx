"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod'

type FormData = {
    message: string;
    contact: string;
    appointment_date: Date
    status:string

}
export default function CustomForm() {
    const schema = z.object({
        message: z.string(),
        contact: z.string().email(),
        appointment_date: z.string().datetime(),
        status: z.string()
    })

    const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) })

    const submitData = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Appointment saved successfully!', JSON.stringify(data));
            // Optionally, reset form fields or show success message
        } catch (error) {
            console.error('Error while saving appointment:', error);
            // Handle error state or show error message
        }

    }
    return (
        <form onSubmit={handleSubmit(submitData)}>
            <label htmlFor="">message</label>
            <input type="text"{...register('message')} />
            <label htmlFor="">contact</label>
            <input type="text" {...register('contact')} />
            <label htmlFor="">appointment date</label>
            <input type="date" {...register('appointment_date')} />
            <label htmlFor="">status</label>
            <input type="status" {...register('status')} />
            <input type="submit" />
        </form>
    )
}
