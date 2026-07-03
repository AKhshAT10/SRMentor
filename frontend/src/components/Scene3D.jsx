// A pure CSS 3D scene: a graduation cap, floating pencils and two people talking.
// Built with real perspective transforms so it reads as genuine 3D, with no
// external libraries so the bundle stays small and deploys cleanly.
const Scene3D = () => {
  return (
    <div className="scene-3d w-full h-[380px] sm:h-[460px] select-none" aria-hidden="true">
      <div className="scene-stage">
        {/* Graduation cap, centered and floating */}
        <div
          className="cap float-slow"
          style={{ top: "18%", left: "50%", marginLeft: "-75px", ["--z"]: "40px", ["--tassel"]: "#facc15" }}
        >
          <div className="cap-base" />
          <div className="cap-board" />
          <div className="cap-button" />
          <div className="cap-tassel" />
        </div>

        {/* Floating pencils on either side */}
        <div
          className="pencil float-mid"
          style={{ top: "30%", left: "12%", ["--z"]: "20px", transform: "rotateZ(28deg)" }}
        >
          <div className="pencil-eraser" />
          <div className="pencil-band" />
          <div className="pencil-body" />
          <div className="pencil-tip" />
          <div className="pencil-lead" />
        </div>

        <div
          className="pencil float-fast"
          style={{ top: "26%", right: "12%", ["--z"]: "60px", transform: "rotateZ(-34deg)" }}
        >
          <div className="pencil-eraser" />
          <div className="pencil-band" />
          <div className="pencil-body" />
          <div className="pencil-tip" />
          <div className="pencil-lead" />
        </div>

        {/* Two people talking */}
        <div className="person float-mid" style={{ bottom: "10%", left: "26%", ["--z"]: "30px" }}>
          <div className="bubble">Hi senior!</div>
          <div className="person-head" />
          <div className="person-body a" />
        </div>

        <div
          className="person float-slow"
          style={{ bottom: "10%", right: "26%", ["--z"]: "30px", transform: "scaleX(-1)" }}
        >
          <div className="bubble two" style={{ transform: "translateZ(70px) scaleX(-1)" }}>
            Happy to help
          </div>
          <div className="person-head" />
          <div className="person-body b" />
        </div>
      </div>
    </div>
  );
};

export default Scene3D;
