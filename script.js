$(document).ready(function () {
  // 변수 선언
  let boxCount = 0; // 현재 박스의 수를 추적
  let copiedBox = null; // 복사된 박스를 저장
  let selectedBox = null; // 현재 선택된 박스를 저장

  // 'Add Layer' 버튼 클릭 시 새 박스 추가
  $("#addLayer").click(() => addResizableBox());
  // 새로운 박스를 추가하는 함수
  function addResizableBox(isInitial = false) {
    boxCount++;
    const alphabet = String.fromCharCode(64 + boxCount); // 박스 중앙에 들어갈 알파벳 생성
    const $resizableBox = $(`<div class="resizable-box" id="box${boxCount}">
                                      <div class="size-display"></div>
                                      <div class="box-center">${alphabet}</div>
                                  </div>`);

    // 초기 박스인 경우 크기 및 위치 설정
    if (isInitial) {
      $resizableBox.css({
        width: "500px",
        height: "500px",
        top: "0",
        left: "0",
      });
    } else {
      // 새로 추가된 박스의 기본 크기 및 위치 설정
      $resizableBox.css({
        width: "100px",
        height: "100px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
    }

    // 박스를 컨테이너에 추가
    $("#container").append($resizableBox);
    setupResizableDraggable($resizableBox); // 드래그 및 리사이즈 기능 활성화
    updateSizeDisplay($resizableBox); // 크기 디스플레이 업데이트
  }

  // 박스에 드래그 및 리사이즈 기능을 설정하는 함수
  function setupResizableDraggable($box) {
    // 이미 기능이 활성화된 경우 초기화
    if ($box.hasClass("ui-resizable")) {
      $box.resizable("destroy");
    }
    if ($box.hasClass("ui-draggable")) {
      $box.draggable("destroy");
    }

    $box
      .resizable({
        containment: "#container", // 박스가 이 범위 내에서만 리사이즈 됨
        grid: [16, 16], // 리사이즈 그리드 크기 설정
        handles: "n, e, s, w, ne, se, sw, nw", // 리사이즈 핸들 위치
        resize: function (event, ui) {
          const width = Math.round(ui.size.width);
          const height = Math.round(ui.size.height);
          $(ui.element)
            .find(".size-display")
            .text(width + "px x " + height + "px"); // 리사이즈 중 크기 업데이트
        },
      })
      .draggable({
        containment: "#container", // 박스가 이 범위 내에서만 드래그 됨
        grid: [16, 16], // 드래그 그리드 크기 설정
      })
      .click(function () {
        // 선택된 박스의 스타일 변경
        if (selectedBox) {
          selectedBox.removeClass("selected");
        }
        selectedBox = $(this);
        selectedBox.addClass("selected");
      });
  }

  // 박스 크기 디스플레이 업데이트 함수
  function updateSizeDisplay($box) {
    let width = Math.round($box.width());
    let height = Math.round($box.height());

    width = width - (width % 16); // 크기를 16의 배수로 조정
    height = height - (height % 16);

    // 크기 변경
    $box.css({
      width: `${width}px`,
      height: `${height}px`,
    });

    $box.find(".size-display").text(width + "px x " + height + "px"); // 크기 텍스트 업데이트
  }

  // 'Resolution' 변경 시 모든 박스의 크기 변경
  $("#resolution").change(function () {
    const [width, height] = $(this).val().split("x");
    $(".resizable-box").css({
      width: `${width}px`,
      height: `${height}px`,
    });
  });

  // 키보드 이벤트 핸들러
  $(document).keydown(function (e) {
    // Ctrl + C로 박스 복사
    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      copiedBox = selectedBox.clone();
      boxCount++;
      copiedBox.attr("id", "box" + boxCount);
      copiedBox.find(".box-center").text(String.fromCharCode(64 + boxCount));

      // 복사된 박스의 기존 핸들러 제거
      if (copiedBox.hasClass("ui-resizable")) {
        copiedBox.resizable("destroy");
      }
      if (copiedBox.hasClass("ui-draggable")) {
        copiedBox.draggable("destroy");
      }
    }

    if (e.ctrlKey && (e.key === "v" || e.key === "V") && copiedBox) {
      $("#container").append(copiedBox);
      setupResizableDraggable(copiedBox);
      updateSizeDisplay(copiedBox);
      copiedBox = null;
    }

    if (e.key === "Delete") {
      if (selectedBox) {
        selectedBox.remove();
        selectedBox = null;
      }
    }
  });

  // 첫 박스 생성
  addResizableBox(true);
});
