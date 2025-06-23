export function getErrorMessage(error: unknown): string {
    if (!error) 
    {
        return 'Неизвестная ошибка';
    }

    if (typeof error === 'object' && error !== null) 
    {
        const err = error as any;

        if (err.message) 
        {
            return err.message;
        }

        if (err.response?.data?.message) 
        {
            return err.response.data.message;
        }
    }

    return 'Произошла ошибка';
}