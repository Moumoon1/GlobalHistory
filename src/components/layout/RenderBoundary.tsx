import { Component, type ErrorInfo, type ReactNode } from "react";

type RenderBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type RenderBoundaryState = {
  hasError: boolean;
};

export class RenderBoundary extends Component<
  RenderBoundaryProps,
  RenderBoundaryState
> {
  state: RenderBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): RenderBoundaryState {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("RenderBoundary caught an app render error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-screen items-center justify-center bg-canvas px-8 text-center text-ink">
            <div>
              <h1 className="text-xl font-bold">页面渲染遇到问题</h1>
              <p className="mt-2 text-sm text-muted">
                请刷新页面；如果仍然出现，我会继续定位是哪一块内容导致的。
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
