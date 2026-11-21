import "./Loading.scss";

export default function Loading({
    text = "Loading...",
    size = 40,
    fullScreen = true,
}) {
    return (
        <div
            className={fullScreen ? "loading loading--full" : "loading"}
            role="status"
            aria-live="polite"
        >
            <span
                className="loading__spinner"
                style={{ width: size, height: size }}
                aria-hidden="true"
            />
            {text && <p className="loading__text">{text}</p>}
        </div>
    );
}