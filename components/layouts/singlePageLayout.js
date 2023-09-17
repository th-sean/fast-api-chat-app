function SinglePageLayout(Component) {
    return function (props) {
        return (
            <div>
                <Component {...props} />
            </div>
        );
    };
}

export default SinglePageLayout;
