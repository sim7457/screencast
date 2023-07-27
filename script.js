$(document).ready(function () {
  let boxCount = 0; // 박스의 숫자를 추적
  let copiedBox = null; // 복사한 박스를 저장
  let selectedBox = null; // 현재 선택된 박스를 저장
  let selectionBox = null; // 선택 영역을 위한 변수
  let startPoint = null; // 드래그 시작점 저장 변수
  let draggingBox = false; // 박스 드래그 상태 표시 변수

  const BORDER_WIDTH = 2; // 박스의 테두리 너비

  // 레이어 추가 버튼 클릭 이벤트
  $("#addLayer").click(() => addResizableBox(true));

  // 새로운 박스를 추가하는 함수
  function addResizableBox(isInitial = false) {
    boxCount++;
    const alphabet = String.fromCharCode(64 + boxCount);

    // 박스의 HTML 구조 생성
    const $resizableBox = $(`
            <div class="resizable-box" id="box${boxCount}">
                <div class="size-display"></div>
                <div class="box-center">${alphabet}</div>
            </div>`);

    // 초기 박스 설정
    if (isInitial) {
      $resizableBox.css({
        top: "0",
        left: "0",
        width: `298px`,
        height: `298px`,
      });
      updateSizeDisplay($resizableBox);
    } else {
      // 기본 박스 설정 (초기 설정이 아닐 때)
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
  // 스크롤 이벤트 핸들러: 박스 크기 조절 또는 드래그 중 스크롤 처리
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

  // 박스를 크기 조절 가능하고 드래그 가능하게 만드는 함수
  function setupResizableDraggable($box, isInitial) {
    $box.resizable({
      containment: "#container",
      grid: [1, 1],
      handles: "n, e, s, w, ne, se, sw, nw",
      resize: function (event, ui) {
        // infoBox 및 size-display의 크기를 실시간으로 업데이트
        $("#boxWidth").val(ui.size.width + 4); // 테두리 크기 고려
        $("#boxHeight").val(ui.size.height + 4); // 테두리 크기 고려

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

        // Show and position the guide lines
        $(".guide-line").hide(); // Hide existing guide lines
        let $otherBoxes = $(".resizable-box").not($box); // Get all other boxes

        $otherBoxes.each(function () {
          let otherBoxPos = $(this).position();
          let otherBoxWidth = $(this).width();
          let otherBoxHeight = $(this).height();

          // Check vertical alignment (left and right sides)
          if (Math.abs(ui.position.left - otherBoxPos.left) <= 5) {
            $(".vertical-guide")
              .css("left", otherBoxPos.left + "px")
              .show();
          } else if (
            Math.abs(
              ui.position.left +
                ui.size.width -
                (otherBoxPos.left + otherBoxWidth)
            ) <= 5
          ) {
            $(".vertical-guide")
              .css("left", otherBoxPos.left + otherBoxWidth + "px")
              .show();
          }

          // Check horizontal alignment (top and bottom sides)
          if (Math.abs(ui.position.top - otherBoxPos.top) <= 5) {
            $(".horizontal-guide")
              .css("top", otherBoxPos.top + "px")
              .show();
          } else if (
            Math.abs(
              ui.position.top +
                ui.size.height -
                (otherBoxPos.top + otherBoxHeight)
            ) <= 5
          ) {
            $(".horizontal-guide")
              .css("top", otherBoxPos.top + otherBoxHeight + "px")
              .show();
          }
        });
        positionGuideLines(ui, "resize");
      },
      start: function (event, ui) {
        // 활성화된 박스만 크기를 조절할 수 있도록 체크
        if (!$(this).hasClass("selected")) {
          return false;
        }
      },
      stop: function (event, ui) {
        // Hide the guide lines when done resizing
        $(".guide-line").hide();
      },
      if(isInitial) {
        $box.css({
          width: "298px", // 테두리 크기 고려해서 조정
          height: "298px", // 테두리 크기 고려해서 조정
        });
        updateSizeDisplay($box);
      },
    });

    function isOverlapping(box1, box2) {
      return !(
        box1.left > box2.right ||
        box1.right < box2.left ||
        box1.top > box2.bottom ||
        box1.bottom < box2.top
      );
    }

    $box.draggable({
      containment: "#container",
      grid: [1, 1],
      snap: ".guide-line",
      snapMode: "inner",

      drag: function (event, ui) {
        handleScroll(ui, "drag");
        $(".vertical-guide, .horizontal-guide").hide();
        positionGuideLines(ui, "drag");
        // infoBox의 위치를 실시간으로 업데이트
        $("#boxX").val(ui.position.left + 2); // 테두리 크기 고려
        $("#boxY").val(ui.position.top + 2); // 테두리 크기 고려

        $(".resizable-box")
          .not(ui.helper)
          .each(function () {
            let currentBox = {
              left: ui.position.left,
              top: ui.position.top,
              right: ui.position.left + $(ui.helper).width(),
              bottom: ui.position.top + $(ui.helper).height(),
            };

            let otherBox = {
              left: $(this).position().left,
              top: $(this).position().top,
              right: $(this).position().left + $(this).width(),
              bottom: $(this).position().top + $(this).height(),
            };

            const snapTolerance = 5;

            if (Math.abs(currentBox.right - otherBox.left) <= snapTolerance) {
              ui.position.left = otherBox.left - $(ui.helper).width();
            } else if (
              Math.abs(currentBox.left - otherBox.right) <= snapTolerance
            ) {
              ui.position.left = otherBox.right;
            }

            if (Math.abs(currentBox.bottom - otherBox.top) <= snapTolerance) {
              ui.position.top = otherBox.top - $(ui.helper).height();
            } else if (
              Math.abs(currentBox.top - otherBox.bottom) <= snapTolerance
            ) {
              ui.position.top = otherBox.bottom;
            }
          });
      },
      start: function (event, ui) {
        // 활성화된 박스만 움직일 수 있도록 체크
        if (!$(this).hasClass("selected")) {
          return false;
        }
      },
    });

    // 초기 박스가 올바른 치수를 가지도록 보장
    if (isInitial) {
      $box.css({
        width: "300px",
        height: "300px",
      });
      updateSizeDisplay($box);
    }
  }

  // 박스를 클릭할 때 infoBox 업데이트
  $("#container").on("click", ".resizable-box", function (e) {
    e.stopPropagation();

    if (selectedBox) {
      selectedBox.removeClass("selected");
    }

    selectedBox = $(this);
    selectedBox.addClass("selected");

    // infoBox에 박스의 현재 위치와 크기 정보를 가져옵니다.
    $("#boxX").val(parseInt(selectedBox.css("left")) + 2);
    $("#boxY").val(parseInt(selectedBox.css("top")) + 2);
    $("#boxWidth").val(selectedBox.width() + 4);
    $("#boxHeight").val(selectedBox.height() + 4);
  });

  // infoBox의 입력 값이 변경되었을 때, 박스 및 size-display 업데이트
  $("#boxX, #boxY, #boxWidth, #boxHeight").on("input", function () {
    if (selectedBox) {
      const x = parseInt($("#boxX").val(), 10) - 2; // 테두리 크기 고려
      const y = parseInt($("#boxY").val(), 10) - 2; // 테두리 크기 고려
      const width = parseInt($("#boxWidth").val(), 10) - 4; // 테두리 크기 고려
      const height = parseInt($("#boxHeight").val(), 10) - 4; // 테두리 크기 고려

      selectedBox.css({
        top: y + "px",
        left: x + "px",
        width: width + "px",
        height: height + "px",
      });

      selectedBox
        .find(".size-display")
        .text(width + 4 + "px x " + (height + 4) + "px"); // 테두리 크기 고려
    }
  });

  // 일관성을 위해 updateSizeDisplay 함수를 업데이트했습니다.
  function updateSizeDisplay($box) {
    let width = Math.round($box.width()) + 4;
    let height = Math.round($box.height()) + 4;

    $box.css({
      width: `${width - 4}px`, // 테두리를 조정합니다.
      height: `${height - 4}px`, // 테두리를 조정합니다.
    });

    $box.find(".size-display").text(width + "px x " + height + "px");
  }

  function positionGuideLines(ui, type) {
    $(".guide-line").remove(); // Remove all existing guide lines

    let $otherBoxes = $(".resizable-box").not(ui.helper);
    let verticalGuides = new Set();
    let horizontalGuides = new Set();

    let boxWidth, boxHeight, boxTop, boxLeft;

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

    const checkAlignment = (value, target, guides) => {
      if (Math.abs(value - target) <= snapTolerance) {
        guides.add(target);
      }
    };

    $otherBoxes.each(function () {
      let otherBoxPos = $(this).position();
      let otherBoxWidth = $(this).width();
      let otherBoxHeight = $(this).height();

      // Vertical alignment checks
      checkAlignment(boxLeft, otherBoxPos.left, verticalGuides);
      checkAlignment(boxLeft + boxWidth, otherBoxPos.left, verticalGuides);
      checkAlignment(boxLeft, otherBoxPos.left + otherBoxWidth, verticalGuides);
      checkAlignment(
        boxLeft + boxWidth,
        otherBoxPos.left + otherBoxWidth,
        verticalGuides
      );

      // Horizontal alignment checks
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
    });

    // Create and position the vertical guide lines
    verticalGuides.forEach((guide) => {
      $("<div>")
        .addClass("guide-line vertical-guide")
        .css({
          left: guide + "px",
        })
        .appendTo("#container")
        .show();
    });

    // Create and position the horizontal guide lines
    horizontalGuides.forEach((guide) => {
      $("<div>")
        .addClass("guide-line horizontal-guide")
        .css({
          top: guide + "px",
        })
        .appendTo("#container")
        .show();
    });

    $(".resizable-box").draggable({
      drag: function (event, ui) {
        positionGuideLines(ui, "drag");

        const snapTolerance = 3;

        let boxLeft = ui.position.left;
        let boxTop = ui.position.top;
        let boxRight = boxLeft + $(ui.helper).width();
        let boxBottom = boxTop + $(ui.helper).height();

        $(".resizable-box")
          .not(ui.helper)
          .each(function () {
            let otherBoxLeft = $(this).position().left;
            let otherBoxTop = $(this).position().top;
            let otherBoxRight = otherBoxLeft + $(this).width();
            let otherBoxBottom = otherBoxTop + $(this).height();

            if (Math.abs(boxRight - otherBoxLeft) <= snapTolerance) {
              ui.position.left = otherBoxLeft - $(ui.helper).width();
            }
            if (Math.abs(boxLeft - otherBoxRight) <= snapTolerance) {
              ui.position.left = otherBoxRight;
            }
            if (Math.abs(boxBottom - otherBoxTop) <= snapTolerance) {
              ui.position.top = otherBoxTop - $(ui.helper).height();
            }
            if (Math.abs(boxTop - otherBoxBottom) <= snapTolerance) {
              ui.position.top = otherBoxBottom;
            }
          });
      },
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

  $(".resizable-box")
    .mousedown(function () {
      draggingBox = true;
    })
    .mouseup(function () {
      draggingBox = false;
    });

  $("body").mousedown(function (e) {
    if ($(e.target).is("#containerOuter") || $(e.target).is("#container")) {
      if (draggingBox) {
        return;
      }
      startPoint = {
        x: e.pageX - $("#container").offset().left,
        y: e.pageY - $("#container").offset().top,
      };
      selectionBox = $("<div>")
        .addClass("selection-box")
        .appendTo("#container");
    }
  });

  $("body").mousemove(function (e) {
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

  $("body").click(function (e) {
    if ($(e.target).is("#containerOuter") || $(e.target).is("#container")) {
      $(".resizable-box.selected").removeClass("selected");
    }
  });

  $(document).keydown(function (e) {
    if (e.key === "Delete") {
      $(".resizable-box.selected").remove();
      $(".selection-box").remove();
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
      const offset = 10;
      copiedBox.css({
        top: `+=${offset}px`,
        left: `+=${offset}px`,
      });
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
