import './Spinner.css';

function Spinner() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-2 bg-slate-100">
            <div className="loading-spinner"></div>
            <p className='font-thin font-xs italic'>Cargando un nuevo CV...</p>
        </div>
    );
}

export default Spinner;