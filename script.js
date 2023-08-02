$(document).ready(function () {
  // 박스와 관련된 변수들을 초기화합니다.
  let boxCount = 0; // 박스의 숫자를 추적합니다.
  let copiedBox = null; // 복사한 박스를 저장합니다.
  let selectedBox = null; // 현재 선택된 박스를 저장합니다.
  let selectionBox = null; // 선택 영역을 위한 변수입니다.
  let startPoint = null; // 드래그 시작점 저장 변수입니다.
  let draggingBox = false; // 박스 드래그 상태 표시 변수입니다.
  let deletedAlphabets = []; // 삭제된 알파벳을 추적하기 위한 배열입니다.

  const BORDER_WIDTH = 2; // 박스의 테두리 너비입니다.

  // 레이어 추가 버튼 클릭 이벤트를 설정합니다.
  $("#addLayer").click(() => addResizableBox(true));

  function updateSizeDisplay($box) {
    const width = $box.outerWidth();
    const height = $box.outerHeight();
    $box.find(".size-display").text(width + "px x " + height + "px");
  }
  // 선택된 박스 삭제 함수
  function deleteSelectedBox() {
    if (selectedBox) {
      selectedBox.remove();
      selectedBox = null;
    }
  }
  function setupDeleteButton($box) {
    const $deleteBtn = $box.find(".delete-media-btn");
    $deleteBtn.click(function () {
      $box.find("video, img").remove();
      $(this).remove();
      $box.data("media-loaded", false);
      addUploadButton($box);
    });
  }

  function duplicateBox($originalBox) {
    const $clonedBox = $originalBox.clone(true); // 박스를 복제합니다.
    $clonedBox.insertAfter($originalBox); // 원래 박스 바로 다음에 복제된 박스를 삽입합니다.

    // 복제된 박스 내의 미디어와 'X' 버튼을 제거합니다.
    $clonedBox.find("video, img, .delete-media-btn").remove();

    // 클론된 박스의 미디어 데이터 초기화
    $clonedBox.data("media-loaded", false);
    // 클론된 박스를 원래 박스 뒤에 삽입
    $originalBox.after($clonedBox);

    if (!$clonedBox.data("media-loaded")) {
      addUploadButton($clonedBox);
    }
  }

  $(document).on("click", ".duplicate-btn", function () {
    const $parentBox = $(this).closest(".box");
    duplicateBox($parentBox);
  });

  function addUploadButton($box) {
    if ($box.find("video, img").length > 0) {
      return; // 박스 내에 미디어가 이미 있으면 함수를 종료
    }

    const uploadBtn = $("<button class='upload-btn'>Upload Media</button>");
    $box.append(uploadBtn); // First, add the button to the DOM
    uploadBtn.click(function () {
      $('<input type="file" accept="video/*,image/*">')
        .on("change", function (event) {
          const file = event.target.files[0];
          if (file) {
            if (file.type.startsWith("video/")) {
              const videoElem = $(
                '<video autoplay loop muted style="width: 100%; height: 100%; object-fit: cover;"></video>'
              );
              videoElem.attr("src", URL.createObjectURL(file));
              $box.append(videoElem);
            } else if (file.type.startsWith("image/")) {
              const imgElem = $(
                '<img style="width: 100%; height: 100%; object-fit: cover;">'
              );
              imgElem.attr("src", URL.createObjectURL(file));
              $box.append(imgElem);
            }
            const deleteBtn = $("<button class='delete-media-btn'>X</button>");
            deleteBtn.click(function () {
              $box.find("video, img").remove();
              $(this).remove();
              $box.data("media-loaded", false);
              addUploadButton($box); // 미디어가 삭제된 후 다시 업로드 버튼을 추가합니다.
            });
            $box.append(deleteBtn);
            $box.data("media-loaded", true); // 미디어가 로드됐다고 표시
            uploadBtn.remove(); // 업로드 버튼을 제거합니다.
          }
        })
        .click();
    });
    $box.append(uploadBtn);
  }
  // 새로운 박스를 추가하는 함수입니다.
  function addResizableBox(isInitial = false) {
    boxCount++;
    let alphabet;

    // 삭제된 알파벳 배열에서 사용 가능한 알파벳이 있는지 확인합니다.
    if (deletedAlphabets.length > 0) {
      alphabet = deletedAlphabets.shift(); // 첫 번째 알파벳을 가져와서 배열에서 삭제합니다.
    } else {
      alphabet = String.fromCharCode(64 + boxCount);
    }

    // 박스의 HTML 구조를 생성합니다.
    const $resizableBox = $(`
            <div class="resizable-box" id="box${boxCount}">
                <div class="size-display"></div>
                <div class="box-center">${alphabet}</div>
            </div>`);

    // 초기 박스 설정을 합니다.
    if (isInitial) {
      $resizableBox.css({
        top: "0",
        left: "0",
        width: `298px`,
        height: `298px`,
      });
      updateSizeDisplay($resizableBox);
    } else {
      // 기본 박스 설정입니다 (초기 설정이 아닐 때).
      let containerWidth = $("#container").width();
      let containerHeight = $("#container").height();
      let boxWidth = 98;
      let boxHeight = 98;
      $resizableBox.css({
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        top: `${(containerHeight - boxHeight) / 2}px`,
        left: `${(containerWidth - boxWidth) / 2}px`,
      });
      updateSizeDisplay($resizableBox);
    }
    $("#container").append($resizableBox);
    setupResizableDraggable($resizableBox, isInitial);
  }

  // 스크롤 이벤트 핸들러: 박스 크기 조절 또는 드래그 중 스크롤 처리 함수입니다.
  function handleScroll(ui, actionType) {
    const sensitivity = 50;
    const scrollSpeed = 15;
    const container = $("#viewport");
    const containerScrollTop = container.scrollTop();
    const containerScrollLeft = container.scrollLeft();
    const boxWidth = $(ui.element).width();
    const boxHeight = $(ui.element).height();

    let bottomPosition, rightPosition;

    if (actionType === "resize") {
      bottomPosition = ui.position.top + ui.size.height;
      rightPosition = ui.position.left + ui.size.width;
    } else if (actionType === "drag") {
      bottomPosition = ui.position.top + boxHeight;
      rightPosition = ui.position.left + boxWidth;
    }

    // 스크롤 조정 로직입니다.
    if (
      bottomPosition >
      containerScrollTop + container.height() - sensitivity
    ) {
      container.scrollTop(containerScrollTop + scrollSpeed);
    }

    if (rightPosition > containerScrollLeft + container.width() - sensitivity) {
      container.scrollLeft(containerScrollLeft + scrollSpeed);
    }

    if (ui.position.top < containerScrollTop + sensitivity) {
      container.scrollTop(containerScrollTop - scrollSpeed);
    }

    if (ui.position.left < containerScrollLeft + sensitivity) {
      container.scrollLeft(containerScrollLeft - scrollSpeed);
    }
  }
  // Delete Media 버튼의 이벤트 핸들러를 설정하는 함수
  function setupDeleteMediaButton($box, $deleteBtn) {
    $deleteBtn.off("click"); // 기존 이벤트 바인딩 제거
    $deleteBtn.click(function () {
      $box.find("video, img").remove();
      $(this).remove();
      $box.data("media-loaded", false);
      addUploadButton($box);
    });
  }

  // 박스를 크기 조절 가능하고 드래그 가능하게 만드는 함수
  function setupResizableDraggable($box, isInitial) {
    // 박스 크기 조절 설정
    $box.resizable({
      containment: "#container",
      grid: [1, 1],
      handles: "n, e, s, w, ne, se, sw, nw",
      snap: ".resizable-box, .guide-line",
      snapMode: "both",
      snapTolerance: 5,
      resize: function (event, ui) {
        // 박스 크기 조절 중 실행되는 함수
        $("#boxWidth").val(ui.size.width);
        $("#boxHeight").val(ui.size.height);
        const width = Math.round(ui.size.width);
        const height = Math.round(ui.size.height);
        $(ui.element)
          .css({
            width: `${width}px`,
            height: `${height}px`,
          })
          .find(".size-display")
          .text(width + "px x " + height + "px");
        handleScroll(ui, "resize");

        // 가이드라인 표시 및 위치 설정
        $(".guide-line").hide();
        positionGuideLines(ui, "resize");

        // 박스 내부의 미디어 크기 조절
        const mediaElem = $(ui.element).find("video, img");
        if (mediaElem.length) {
          mediaElem.css({
            width: ui.size.width + "px",
            height: ui.size.height + "px",
          });
        }
      },
      start: function (event, ui) {
        // 크기 조절 시작 시 실행되는 함수
        if (!$(this).hasClass("selected")) {
          return false;
        }
      },
      stop: function (event, ui) {
        // 크기 조절 종료 시 실행되는 함수
        $(".guide-line").hide();
      },
    });

    // 박스 드래그 설정
    $box.draggable({
      containment: "#container",
      grid: [1, 1],
      snap: ".guide-line",
      snapMode: "both",
      snap: ".resizable-box, .guide-line",
      snapTolerance: 5,
      drag: function (event, ui) {
        // 박스 드래그 중 실행되는 함수
        handleScroll(ui, "drag");
        $("#boxX").val(ui.position.left);
        $("#boxY").val(ui.position.top);

        // 가이드라인 표시 및 위치 설정
        positionGuideLines(ui, "drag");
      },
      start: function (event, ui) {
        // 드래그 시작 시 실행되는 함수
        if (!$(this).hasClass("selected")) {
          return false;
        }
      },
      stop: function (event, ui) {
        // 드래그 종료 시 컨테이너 내로 박스 위치를 조정
        if (ui.position.left < 0) ui.helper.css("left", "0px");
        if (ui.position.top < 0) ui.helper.css("top", "0px");
        let maxLeft = $("#container").width() - ui.helper.width();
        let maxTop = $("#container").height() - ui.helper.height();
        if (ui.position.left > maxLeft) ui.helper.css("left", maxLeft + "px");
        if (ui.position.top > maxTop) ui.helper.css("top", maxTop + "px");
      },
    });

    // 초기 박스 크기 설정
    if (isInitial) {
      $box.css({
        width: "300px",
        height: "300px",
      });
      updateSizeDisplay($box);
    }
  }

  // 박스 클릭 이벤트 처리
  $("#container").on("click", ".resizable-box", function (e) {
    e.stopPropagation();
    if (selectedBox) {
      selectedBox.removeClass("selected");
    }
    selectedBox = $(this);
    selectedBox.addClass("selected");

    // 박스 정보 업데이트
    $("#boxX").val(parseInt(selectedBox.css("left")));
    $("#boxY").val(parseInt(selectedBox.css("top")));
    $("#boxWidth").val(
      selectedBox.width() +
        (selectedBox.hasClass("selected") ? 2 * BORDER_WIDTH : 0)
    );
    $("#boxHeight").val(
      selectedBox.height() +
        (selectedBox.hasClass("selected") ? 2 * BORDER_WIDTH : 0)
    );

    // 미디어 파일 선택 및 추가 코드를 함수로 대체
    if (!$(this).data("media-loaded")) {
      addUploadButton($(this)); // 함수 호출로 대체
    }
  });

  // infoBox 입력 값 변경 이벤트 처리
  $("#boxX, #boxY, #boxWidth, #boxHeight").on("input", function () {
    if (selectedBox) {
      const x = parseInt($("#boxX").val(), 10);
      const y = parseInt($("#boxY").val(), 10);
      const width =
        parseInt($("#boxWidth").val(), 10) -
        (selectedBox.hasClass("selected") ? 2 * BORDER_WIDTH : 0);
      const height =
        parseInt($("#boxHeight").val(), 10) -
        (selectedBox.hasClass("selected") ? 2 * BORDER_WIDTH : 0);

      selectedBox.css({
        top: y + "px",
        left: x + "px",
        width: width + "px",
        height: height + "px",
      });
      selectedBox
        .find(".size-display")
        .text(
          width +
            2 * BORDER_WIDTH +
            "px x " +
            (height + 2 * BORDER_WIDTH) +
            "px"
        );
    }
  });
  // 박스의 크기 표시를 업데이트하는 함수
  function positionGuideLines(ui, type) {
    $(".guide-line").remove(); // 기존의 가이드라인 제거

    let $otherBoxes = $(".resizable-box").not(ui.helper);
    let verticalGuides = new Set();
    let horizontalGuides = new Set();

    let boxWidth, boxHeight, boxTop, boxLeft;

    // 드래그 중인지 크기 조절 중인지 확인하여 박스의 크기 및 위치를 설정
    if (type === "resize") {
      boxWidth = ui.size.width;
      boxHeight = ui.size.height;
      boxTop = ui.position.top;
      boxLeft = ui.position.left;
    } else if (type === "drag") {
      boxWidth = $(ui.helper).width();
      boxHeight = $(ui.helper).height();
      boxTop = ui.position.top;
      boxLeft = ui.position.left;
    }

    const snapTolerance = 3;

    // 박스 간의 정렬을 확인하는 함수
    const checkAlignment = (value, target, guides) => {
      if (Math.abs(value - target) <= snapTolerance) {
        guides.add(target);
      }
    };

    // 가이드라인 위치 계산
    $otherBoxes.each(function () {
      let otherBoxPos = $(this).position();
      let otherBoxWidth = $(this).width();
      let otherBoxHeight = $(this).height();

      // 세로 정렬 검사
      checkAlignment(boxLeft, otherBoxPos.left, verticalGuides);
      checkAlignment(boxLeft + boxWidth, otherBoxPos.left, verticalGuides);
      checkAlignment(boxLeft, otherBoxPos.left + otherBoxWidth, verticalGuides);
      checkAlignment(
        boxLeft + boxWidth,
        otherBoxPos.left + otherBoxWidth,
        verticalGuides
      );

      // 바깥쪽 모서리에 대한 세로 정렬 검사
      checkAlignment(boxLeft - boxWidth, otherBoxPos.left, verticalGuides);
      checkAlignment(
        boxLeft - boxWidth,
        otherBoxPos.left + otherBoxWidth,
        verticalGuides
      );

      // 가로 정렬 검사
      checkAlignment(boxTop, otherBoxPos.top, horizontalGuides);
      checkAlignment(boxTop + boxHeight, otherBoxPos.top, horizontalGuides);
      checkAlignment(
        boxTop,
        otherBoxPos.top + otherBoxHeight,
        horizontalGuides
      );
      checkAlignment(
        boxTop + boxHeight,
        otherBoxPos.top + otherBoxHeight,
        horizontalGuides
      );

      // 바깥쪽 모서리에 대한 가로 정렬 검사
      checkAlignment(boxTop - boxHeight, otherBoxPos.top, horizontalGuides);
      checkAlignment(
        boxTop - boxHeight,
        otherBoxPos.top + otherBoxHeight,
        horizontalGuides
      );
    });

    // 세로 가이드라인 생성 및 위치 설정
    verticalGuides.forEach((guide) => {
      let $vGuide = $("<div>")
        .addClass("guide-line vertical-guide")
        .css({ left: guide + "px" })
        .appendTo("#container")
        .show()
        .draggable({
          snap: ".resizable-box, .guide-line",
          snapTolerance: 5,
        });
    });

    // 가로 가이드라인 생성 및 위치 설정
    horizontalGuides.forEach((guide) => {
      let $hGuide = $("<div>")
        .addClass("guide-line horizontal-guide")
        .css({ top: guide + "px" })
        .appendTo("#container")
        .show()
        .draggable({
          snap: ".resizable-box, .guide-line",
          snapTolerance: 5,
        });
    });
  }

  // 컨테이너 해상도 변경 이벤트
  $("#resolution").change(function () {
    const [width, height] = $(this).val().split("x");
    $("#container").css({
      width: `${width}px`,
      height: `${height}px`,
    });
  });

  // 해상도 변경 드롭다운 이벤트
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

  // 박스의 마우스 이벤트 설정
  $(".resizable-box")
    .mousedown(function () {
      // 박스를 마우스로 클릭할 때
      draggingBox = true;
    })
    .mouseup(function () {
      // 박스에서 마우스 버튼을 놓을 때
      draggingBox = false;
    });

  // 컨테이너 밖에서의 마우스 이벤트 설정
  $("body").mousedown(function (e) {
    // 컨테이너나 컨테이너 외부를 클릭할 경우
    if ($(e.target).is("#containerOuter") || $(e.target).is("#container")) {
      if (draggingBox) {
        return;
      }
      startPoint = {
        x: e.pageX - $("#container").offset().left,
        y: e.pageY - $("#container").offset().top,
      };
      // 선택 박스를 컨테이너에 추가
      selectionBox = $("<div>")
        .addClass("selection-box")
        .appendTo("#container");
    }
  });

  $("body").mousemove(function (e) {
    // 선택 박스의 크기 및 위치를 업데이트
    if (startPoint && !draggingBox) {
      const currentPoint = {
        x: e.pageX - $("#container").offset().left,
        y: e.pageY - $("#container").offset().top,
      };
      const left = Math.min(startPoint.x, currentPoint.x);
      const top = Math.min(startPoint.y, currentPoint.y);
      const width = Math.abs(startPoint.x - currentPoint.x);
      const height = Math.abs(startPoint.y - currentPoint.y);
      selectionBox.css({ left, top, width, height });
    }
  });

  $("body").mouseup(function (e) {
    // 선택한 영역 내의 박스를 선택
    if (startPoint && !draggingBox) {
      const currentPoint = {
        x: e.pageX - $("#container").offset().left,
        y: e.pageY - $("#container").offset().top,
      };
      $(".resizable-box").each(function () {
        const boxPosition = $(this).position();
        const boxWidth = $(this).width();
        const boxHeight = $(this).height();
        const isOverlapping =
          startPoint.x < boxPosition.left + boxWidth &&
          currentPoint.x > boxPosition.left &&
          startPoint.y < boxPosition.top + boxHeight &&
          currentPoint.y > boxPosition.top;
        if (isOverlapping) {
          $(this).addClass("selected");
        }
      });
      startPoint = null;
      selectionBox.remove();
    }
  });

  // 컨테이너나 컨테이너 외부를 클릭하면 선택된 박스의 선택을 취소
  $("body").click(function (e) {
    if ($(e.target).is("#containerOuter") || $(e.target).is("#container")) {
      $(".resizable-box.selected").removeClass("selected");
    }
  });

  // Delete 키를 누르면 선택된 박스를 삭제
  $(document).keydown(function (e) {
    if (e.key === "Delete") {
      // 선택된 박스의 알파벳을 추출하고 삭제된 알파벳 배열에 추가합니다.
      if (selectedBox) {
        const deletedChar = selectedBox.find(".box-center").text();
        deletedAlphabets.push(deletedChar);
      }

      $(".resizable-box.selected").remove();
      $(".selection-box").remove();

      // 모든 박스가 삭제되었는지 확인합니다.
      if ($(".resizable-box").length === 0) {
        boxCount = 0; // 박스 카운트를 초기화합니다.
        deletedAlphabets = []; // 삭제된 알파벳 배열도 초기화합니다.
      }
    }
  });

  $(document).keydown(function (e) {
    if (e.ctrlKey && (e.key === "c" || e.key === "C") && selectedBox) {
      copiedBox = selectedBox.clone();
      boxCount++;
      copiedBox.attr("id", "box" + boxCount);
      copiedBox.find(".box-center").text(String.fromCharCode(64 + boxCount));
    }

    if (e.ctrlKey && (e.key === "v" || e.key === "V") && copiedBox) {
      const offset = 10;
      copiedBox.css({
        top: `+=${offset}px`,
        left: `+=${offset}px`,
      });
      $("#container").append(copiedBox);
      setupResizableDraggable(copiedBox, false);

      if (!copiedBox.data("media-loaded")) {
        addUploadButton(copiedBox);
      }

      setupDeleteButton(copiedBox);
      copiedBox = null;
    }

    if (e.key === "Delete") {
      deleteSelectedBox();
    }
  });

  addResizableBox(true);
});
