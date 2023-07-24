$(document).ready(function () {
  let boxCount = 0;

  function addResizableBox(isInitial = false) {
    boxCount++;
    const $resizableBox = $(`<div class="resizable-box" id="box${boxCount}">
                                      <div class="size-display"></div>
                                  </div>`);

    if (isInitial) {
      $resizableBox.css({
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
      });
    } else {
      $resizableBox.css({
        width: "100px",
        height: "100px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
    }

    $("#container").append($resizableBox);

    $resizableBox.resizable({
      containment: "#container",
      resize: function (event, ui) {
        updateSizeDisplay($resizableBox);
      },
    });

    $resizableBox.draggable({
      containment: "#container",
      handle: ".size-display",
    });

    updateSizeDisplay($resizableBox);
  }

  function updateSizeDisplay($box) {
    const width = $box.width();
    const height = $box.height();
    $box.find(".size-display").text(width + "px x " + height + "px");
  }

  $("#addLayer").click(() => addResizableBox());

  // 해상도 변경 이벤트
  $("#resolution").change(function () {
    const [width, height] = $(this).val().split("x");
    $("#container")
      .css({
        width: `${width}px`,
        height: `${height}px`,
      })
      .find(".size-display")
      .text(`${width}px x ${height}px`);
  });

  // 페이지 로드 시 초기 박스 생성
  addResizableBox(true);
});
