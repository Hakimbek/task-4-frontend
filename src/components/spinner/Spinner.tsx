const Spinner = () => {
    return (
        <div
            style={{ left: 0, right: 0, backgroundColor: 'rgba(245,245,245,0.5)' }}
            className="d-flex position-absolute bottom-0 top-0 justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    )
}

export default Spinner;