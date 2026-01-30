import Lottie from "react-lottie";

function Animation(props: any) {
    const { animationData } = props;
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return <Lottie options={defaultOptions} />;
}

export default Animation;
