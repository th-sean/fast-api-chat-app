function SinglePageLayout(WrappedComponent) {
    function LayoutComponent(props) {
        return (
            <div>
                <WrappedComponent {...props} />
            </div>
        );
    }

    LayoutComponent.displayName = `SinglePageLayout(${getDisplayName(WrappedComponent)})`;

    return LayoutComponent;
}

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

export default SinglePageLayout;
