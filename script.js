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
        width: "300px",
        height: "300px",
      });
      updateSizeDisplay($resizableBox);
    } else {
      let containerWidth = $("#container").width();
      let containerHeight = $("#container").height();
      let boxWidth = 100;
      let boxHeight = 100;
      // 다른 박스들을 위해 기본 크기 설정 및 중앙에 배치
      $resizableBox.css({
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        top: `${(containerHeight - boxHeight) / 2}px`,
        left: `${(containerWidth - boxWidth) / 2}px`,
      });
    }
    $("#container").append($resizableBox);
    setupResizableDraggable($resizableBox, isInitial);
    updateSizeDisplay($resizableBox);
  }

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
      stop: function (event, ui) {
        // Hide the guide lines when done resizing
        $(".guide-line").hide();
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
      drag: function (event, ui) {
        handleScroll(ui, "drag");
        $(".vertical-guide, .horizontal-guide").hide();
        positionGuideLines(ui, "drag");

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

        $(".vertical-guide").each(function () {
          let guideLeft = $(this).position().left;
          if (Math.abs(boxLeft - guideLeft) <= snapTolerance) {
            ui.position.left = guideLeft;
          }
        });

        $(".horizontal-guide").each(function () {
          let guideTop = $(this).position().top;
          if (Math.abs(boxTop - guideTop) <= snapTolerance) {
            ui.position.top = guideTop;
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
