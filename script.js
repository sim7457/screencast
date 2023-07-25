$(document).ready(function () {
  let boxCount = 0;
  let copiedBox = null;
  let selectedBox = null;

  // 레이어 추가 버튼 이벤트
  $("#addLayer").click(() => addResizableBox(true));

  // 새로운 박스를 추가하는 함수
  function addResizableBox(isInitial = false) {
    boxCount++;
    const alphabet = String.fromCharCode(64 + boxCount);

    // 박스의 HTML 구조
    const $resizableBox = $(`
                <div class="resizable-box" id="box${boxCount}">
                    <div class="size-display"></div>
                    <div class="box-center">${alphabet}</div>
                </div>`);

    if (isInitial) {
      $resizableBox.css({
        top: "0",
        left: "0",
        width: "500px",
        height: "500px",
      });
      updateSizeDisplay($resizableBox);
    } else {
      // 다른 박스들을 위해 기본 크기 설정 및 중앙에 배치
      $resizableBox.css({
        width: "100px",
        height: "100px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
    }
    $("#container").append($resizableBox);
    setupResizableDraggable($resizableBox, isInitial);
    updateSizeDisplay($resizableBox);
  }

  // 박스를 크기 조절 가능하고 드래그 가능하게 만드는 함수
  function setupResizableDraggable($box, isInitial) {
    $box
      .resizable({
        containment: "#container",
        grid: [1, 1],
        handles: "n, e, s, w, ne, se, sw, nw",
        resize: function (event, ui) {
          const width = Math.round(ui.size.width);
          const height = Math.round(ui.size.height);
          $(ui.element)
            .find(".size-display")
            .text(width + "px x " + height + "px");
        },
      })
      .draggable({
        containment: "#container",
        grid: [1, 1],
      });

    // 초기 박스가 올바른 치수를 가지도록 보장
    if (isInitial) {
      $box.css({
        width: "500px",
        height: "500px",
      });
      updateSizeDisplay($box);
    }
  }

  // 클릭할 때 박스를 선택하는 이벤트
  $("#container").on("click", ".resizable-box", function (e) {
    e.stopPropagation();

    if (selectedBox) {
      selectedBox.removeClass("selected");
    }

    selectedBox = $(this);
    selectedBox.addClass("selected");
  });

  // 이 이벤트 리스너는 박스의 선택을 취소하기 위한 배경 클릭을 처리합니다
  $("#container").on("click", function (e) {
    if (e.target === this && selectedBox) {
      selectedBox.removeClass("selected");
      selectedBox = null;
    }
  });

  // 박스 크기를 표시하고 그리드에 맞게 크기 조절
  function updateSizeDisplay($box) {
    let width = Math.round($box.width());
    let height = Math.round($box.height());
    width = width - (width % 1);
    height = height - (height % 1);

    $box.css({
      width: `${width}px`,
      height: `${height}px`,
    });

    $box.find(".size-display").text(width + "px x " + height + "px");
  }

  // 컨테이너 해상도 변경 이벤트
  $("#resolution").change(function () {
    const [width, height] = $(this).val().split("x");
    $("#container").css({
      width: `${width}px`,
      height: `${height}px`,
    });
  });

  // 해상도 변경 기능 추가
  $("#resolutionDropdown").change(function () {
    const resolution = $(this).val();
    switch (resolution) {
      case "1080":
        $("#container").css({
          width: "1920px",
          height: "1080px",
        });
        break;
      case "720":
        $("#container").css({
          width: "1280px",
          height: "720px",
        });
        break;
      case "480":
        $("#container").css({
          width: "854px",
          height: "480px",
        });
        break;
      case "360":
        $("#container").css({
          width: "640px",
          height: "360px",
        });
        break;
      case "4k":
        $("#container").css({
          width: "3840px",
          height: "2160px",
        });
        break;
      default:
        break;
    }
  });

  // 복사, 붙여넣기 및 삭제 기능을 위한 키다운 이벤트
  $(document).keydown(function (e) {
    if (e.ctrlKey && (e.key === "c" || e.key === "C") && selectedBox) {
      copiedBox = selectedBox.clone();
      boxCount++;
      copiedBox.attr("id", "box" + boxCount);
      copiedBox.find(".box-center").text(String.fromCharCode(64 + boxCount));
    }

    if (e.ctrlKey && (e.key === "v" || e.key === "V") && copiedBox) {
      $("#container").append(copiedBox);
      setupResizableDraggable(copiedBox, false);
      copiedBox.click(function () {
        if (selectedBox) {
          selectedBox.removeClass("selected");
        }
        selectedBox = $(this);
        selectedBox.addClass("selected");
      });
      copiedBox = null;
    }

    if (e.key === "Delete") {
      if (selectedBox) {
        selectedBox.remove();
        selectedBox = null;
      }
    }
  });

  addResizableBox(true);
});
