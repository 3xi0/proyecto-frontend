import './ErrorScreen.css';

function ErrorScreen(props) {
    const msg = props.msg;
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-2 bg-slate-100">
            <h3 className="font-semibold text-4xl text-red-600">ERROR</h3>
            <p className="font-normal font-md italic text-red-400">{msg}</p>
            <p className="font-normal font-md italic text-red-400">Recargue la página para reintentar.</p>
        </div>
    );
}

export default ErrorScreen;