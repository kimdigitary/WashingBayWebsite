'use client'
import {useFormAction} from "@/hooks/use-form-hook";
import {saveContact} from "@/actions";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const contactSchema = z.object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Form() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema)
    });

    const {isPending, onSubmit} = useFormAction<ContactFormValues,unknown>(saveContact, (state) => {
        if (state.success) {
            reset();
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        {...register("first_name")}
                        className={`w-full bg-gray-50 dark:bg-black/40 border ${errors.first_name ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent'} text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all`}
                        placeholder="First Name"
                    />
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        {...register("last_name")}
                        className={`w-full bg-gray-50 dark:bg-black/40 border ${errors.last_name ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent'} text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all`}
                        placeholder="Last Name"
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                </div>
            </div>

            <div>
                <input
                    type="email"
                    {...register("email")}
                    className={`w-full bg-gray-50 dark:bg-black/40 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent'} text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all`}
                    placeholder="Email Address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <textarea
                    rows={4}
                    {...register("message")}
                    className={`w-full bg-gray-50 dark:bg-black/40 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-theme-accent'} text-gray-900 dark:text-theme-text rounded-xl p-3 text-sm focus:border-theme-red focus:ring-1 focus:ring-theme-red outline-none transition-all resize-none`}
                    placeholder="Your Message..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={`
                    w-full py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider
                    ${isPending ? 'bg-theme-red/70 cursor-not-allowed' : 'bg-theme-red text-white hover:bg-theme-darkRed'}
                `}
            >
                {isPending ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                ) : (
                    <>Send Message <i className="fas fa-paper-plane"></i></>
                )}
            </button>
        </form>
    )
}
