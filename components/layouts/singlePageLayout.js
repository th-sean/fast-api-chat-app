

function SinglePageLayout(children) {
    return function (props) {
        return (
            <div>
                {children}
            </div>
        );
    };
}

export default SinglePageLayout;
