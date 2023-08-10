$(document).ready(function () {
  // 박스와 관련된 변수들을 초기화합니다.

  let boxCount = 0; // 박스의 숫자를 추적합니다.

  let copiedBox = null; // 복사한 박스를 저장합니다.

  let selectedBox = null; // 현재 선택된 박스를 저장합니다.

  let selectionBox = null; // 선택 영역을 위한 변수입니다.

  let startPoint = null; // 드래그 시작점 저장 변수입니다.

  let draggingBox = false; // 박스 드래그 상태 표시 변수입니다.

  let zoomLevel = 1; // 줌 레벨을 추적합니다.

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
    if ($box.find("video, img, btn").length > 0) {
      return; // 박스 내에 미디어가 이미 있으면 함수를 종료
    }

    // 미디어 업로드 버튼 추가

    const uploadBtn = $("<button class='upload-btn'>Upload Media</button>");

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

            uploadBtn.remove();

            $box.find(".upload-btn").remove(); // 업로드 버튼을 제거합니다.
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
      bottomPosition = Math.round(ui.position.top) + Math.round(ui.size.height);

      rightPosition = Math.round(ui.position.left) + Math.round(ui.size.width);
    } else if (actionType === "drag") {
      bottomPosition = Math.round(ui.position.top) + boxHeight;

      rightPosition = Math.round(ui.position.left) + boxWidth;
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

    if (Math.round(ui.position.top) < containerScrollTop + sensitivity) {
      container.scrollTop(containerScrollTop - scrollSpeed);
    }

    if (Math.round(ui.position.left) < containerScrollLeft + sensitivity) {
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

        $("#boxWidth").val(Math.round(ui.size.width));

        $("#boxHeight").val(Math.round(ui.size.height));

        const width = Math.round(Math.round(ui.size.width));

        const height = Math.round(Math.round(ui.size.height));

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
            width: Math.round(ui.size.width) + "px",

            height: Math.round(ui.size.height) + "px",
          });
        }
      },

      start: function (event, ui) {
        // 크기 조절 시작 시 실행되는 함수

        if (!$(this).hasClass("selected")) {
          return false;
        }
        // box-sizing 속성을 border-box로 설정합니다.

        $(this).css("box-sizing", "border-box");
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

      snapMode: "both",

      snap: ".resizable-box, .guide-line",

      snapTolerance: 5,

      drag: function (event, ui) {
        // 박스 드래그 중 실행되는 함수

        handleScroll(ui, "drag");

        $("#boxX").val(Math.round(ui.position.left));

        $("#boxY").val(Math.round(ui.position.top));

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

        if (Math.round(ui.position.left) < 0) ui.helper.css("left", "0px");

        if (Math.round(ui.position.top) < 0) ui.helper.css("top", "0px");

        let maxLeft = $("#container").width() - ui.helper.width();

        let maxTop = $("#container").height() - ui.helper.height();

        if (Math.round(ui.position.left) > maxLeft)
          ui.helper.css("left", maxLeft + "px");

        if (Math.round(ui.position.top) > maxTop)
          ui.helper.css("top", maxTop + "px");
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
      boxWidth = Math.round(ui.size.width);

      boxHeight = Math.round(ui.size.height);

      boxTop = Math.round(ui.position.top);

      boxLeft = Math.round(ui.position.left);
    } else if (type === "drag") {
      boxWidth = $(ui.helper).width();

      boxHeight = $(ui.helper).height();

      boxTop = Math.round(ui.position.top);

      boxLeft = Math.round(ui.position.left);
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

    $("#layer").css({
      width: `${width}px`,

      height: `${height}px`,
    });
  });

  // 해상도 변경 드롭다운 이벤트

  $("#resolutionDropdown").change(function () {
    const resolution = $(this).val();

    switch (resolution) {
      case "1080":
        $("#layer").css({
          width: "1920px",

          height: "1080px",
        });

        break;

      case "720":
        $("#layer").css({
          width: "1280px",

          height: "720px",
        });

        break;

      case "480":
        $("#layer").css({
          width: "720px",

          height: "480px",
        });

        break;

      case "4k":
        $("#layer").css({
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

let isCtrlPressed = false;

let zoomLevel = 1;

$(document).keydown(function (e) {
  if (e.key === "Control") {
    isCtrlPressed = true;
  }
});

$(document).keyup(function (e) {
  if (e.key === "Control") {
    isCtrlPressed = false;
  }
});

$("#container").on("mousewheel", function (e) {
  if (isCtrlPressed) {
    e.preventDefault();

    // Adjust zoom level by 0.05 (5%) based on mousewheel direction for smoother zooming

    zoomLevel += e.originalEvent.deltaY > 0 ? -0.05 : 0.05;

    // Set a minimum and maximum zoom level

    if (zoomLevel < 0.02) zoomLevel = 0.02;

    if (zoomLevel > 3) zoomLevel = 3;

    $("#container").css(
      "transform",

      `translate(-50%, -50%) scale(${zoomLevel})`
    );

    $("#zoomPercentage").text(`${(zoomLevel * 100).toFixed(0)}%`);
  }
});

$("#widthInput, #heightInput").change(function () {
  const newWidth = $("#widthInput").val();

  const newHeight = $("#heightInput").val();

  $("#layer").css({
    width: newWidth + "px",

    height: newHeight + "px",
  });

  fitLayerToScreen();
});

// 레이어를 화면에 맞게 조절하는 함수

function fitLayerToScreen() {
  const viewportWidth = $(window).width();

  const viewportHeight = $(window).height();

  const layerWidthValue = $("#layer").outerWidth();

  const layerHeightValue = $("#layer").outerHeight();

  // Calculate the scale required to fit the layer within the viewport

  const scaleWidth = (viewportWidth * 0.75) / layerWidthValue; // Adjusted to 85% for more centering

  const scaleHeight = (viewportHeight * 0.75) / layerHeightValue; // Adjusted to 85% for more centering

  zoomLevel = Math.min(scaleWidth, scaleHeight);

  if (zoomLevel > 1) zoomLevel = 1; // Ensure that the layer isn't zoomed in more than its original size

  $("#container").css("transform", `translate(-50%, -50%) scale(${zoomLevel})`);

  $("#zoomPercentage").text(`${(zoomLevel * 100).toFixed(0)}%`);
}

// Initial fitting when the page loads

$(document).ready(function () {
  fitLayerToScreen();
});

$("#resolutionDropdown").change(function () {
  const selectedResolution = $(this).val();

  let newWidth, newHeight;

  switch (selectedResolution) {
    case "4k":
      newWidth = 3840;

      newHeight = 2160;

      break;

    case "1080":
      newWidth = 1920;

      newHeight = 1080;

      break;

    case "720":
      newWidth = 1280;

      newHeight = 720;

      break;

    case "480":
      newWidth = 720;

      newHeight = 480;

      break;
  }

  $("#widthInput").val(newWidth);

  $("#heightInput").val(newHeight);

  $("#layer").css({
    width: newWidth + "px",

    height: newHeight + "px",
  });

  fitLayerToScreen();
});

// 레이어를 컨테이너 내에서 드래그 가능하게 합니다

// Making the layer draggable within the container

$("#layer").draggable({
  containment: "#container",
});

// 수정 사항: 줌 기능이 #container 내에서 작동하도록 변경하였습니다.

// 변환의 번역 부분을 원래대로 변경하여 요소가 화면 중앙에 위치하도록 하였습니다.

// .flex_web_left 박스 위에 있을 때 컨트롤 휠 클릭으로 레이어 크기를 줄이거나 늘립니다.

$(".flex_web_left").on("mousewheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault(); // 기본 줌 동작을 막습니다.

    // 휠을 위로 스크롤하면 줌 인, 아래로 스크롤하면 줌 아웃합니다.

    if (e.originalEvent.deltaY < 0) {
      zoomLevel += 0.05;
    } else {
      zoomLevel -= 0.05;
    }

    // .flex_web_left의 변환을 적용하여 줌을 조정합니다.

    $(".flex_web_left").css("transform", `scale(${zoomLevel})`);

    $("#zoomPercentage").text(Math.round(zoomLevel * 100) + "%"); // 줌 비율을 표시합니다.
  }
});

// .flex_web_left 박스 위에서 컨트롤 키와 함께 휠 클릭으로 홈페이지의 기본 확대/축소 기능을 막습니다.

$(".flex_web_left").on("mousewheel", function (e) {
  if (e.ctrlKey && !$(e.target).closest("#layer").length) {
    e.preventDefault(); // 레이어 외의 영역에서 컨트롤 키와 함께 휠 클릭 시 기본 줌 동작을 막습니다.
  }
});

// 레이어 사이즈에 맞게 표시합니다.

function fitLayerSize() {
  const containerWidth = $(".flex_web_left").width();

  const containerHeight = $(".flex_web_left").height();

  const layerWidthValue = $("#layer").width();

  const layerHeightValue = $("#layer").height();

  // 컨테이너와 레이어의 크기를 비교하여 적절한 스케일을 계산합니다.

  const scaleWidth = containerWidth / layerWidthValue;

  const scaleHeight = containerHeight / layerHeightValue;

  const scale = Math.min(scaleWidth, scaleHeight) * 0.9; // 여유 공간을 두기 위해 0.9를 곱합니다.

  // 스케일을 적용합니다.

  $("#container").css("transform", `scale(${scale})`);

  $("#zoomPercentage").text(Math.round(scale * 100) + "%"); // 줌 비율을 표시합니다.
}

// 레이어 드래그 기능을 위한 변수를 선언합니다.

let isDragging = false;

let dragStartX = 0;

let dragStartY = 0;

// 스페이스바를 눌렀을 때 드래그 모드를 활성화합니다.

$(document).on("keydown", function (e) {
  if (e.keyCode === 32) {
    // 스페이스바 키 코드

    e.preventDefault();

    isDragging = true;

    $("body").css("cursor", "grab"); // 커서를 손모양으로 변경합니다.
  }
});

// 스페이스바를 뗐을 때 드래그 모드를 비활성화합니다.

$(document).on("keyup", function (e) {
  if (e.keyCode === 32) {
    isDragging = false;

    $("body").css("cursor", "default"); // 커서를 기본 모양으로 변경합니다.
  }
});

// 드래그 시작 위치를 저장합니다.

$(document).on("mousedown", function (e) {
  if (isDragging) {
    dragStartX = e.clientX;

    dragStartY = e.clientY;
  }
});

// 드래그로 레이어를 움직입니다.

$(document).on("mousemove", function (e) {
  if (isDragging) {
    const dx = e.clientX - dragStartX;

    const dy = e.clientY - dragStartY;

    const left = parseInt($("#container").css("left"), 10) || 0;

    const top = parseInt($("#container").css("top"), 10) || 0;

    // 드래그 거리만큼 레이어를 이동합니다.

    $("#container").css({ left: left + dx, top: top + dy });

    // 현재 위치를 시작 위치로 업데이트합니다.

    dragStartX = e.clientX;

    dragStartY = e.clientY;
  }
});

// 초기 레이어 사이즈에 맞게 조정합니다.

fitLayerSize();

// 레이어와 함께 #container를 움직입니다.

function moveContainerWithLayer(dx, dy) {
  const left = parseInt($("#container").css("left"), 10) || 0;

  const top = parseInt($("#container").css("top"), 10) || 0;

  // 드래그 거리만큼 레이어와 #container를 이동합니다.

  $("#container").css({ left: left + dx, top: top + dy });
}

// 드래그로 레이어와 #container를 움직입니다.

$(document).on("mousemove", function (e) {
  if (isDragging) {
    const dx = e.clientX - dragStartX;

    const dy = e.clientY - dragStartY;

    // 레이어와 #container를 함께 움직입니다.

    moveContainerWithLayer(dx, dy);

    // 현재 위치를 시작 위치로 업데이트합니다.

    dragStartX = e.clientX;

    dragStartY = e.clientY;
  }
});

// 스페이스바를 눌렀을 때 드래그 시작 위치를 저장합니다.

$(document).on("keydown", function (e) {
  if (e.keyCode === 32) {
    // 스페이스바 키 코드

    e.preventDefault();

    isDragging = true;

    $("body").css("cursor", "grab"); // 커서를 손모양으로 변경합니다.

    // 드래그 시작 위치를 현재 마우스 위치로 설정합니다.

    dragStartX = e.clientX;

    dragStartY = e.clientY;
  }
});

function updateInitialLayerSize() {
  $("#boxWidth").val(layerWidthValue);

  $("#boxHeight").val(layerHeightValue);
}

$(document).ready(function () {
  updateInitialLayerSize();
});

$(".flex_web_left").on("wheel", function (e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
});

$(".resizable-box").resizable({
  maxWidth: $("#container").width() - 4, // 최대 너비 설정

  maxHeight: $("#container").height() - 4, // 최대 높이 설정
});

$(document).ready(function () {
  function setInitialSize() {
    var selectedValue = $("#resolutionDropdown").val();
    var size = { width: 0, height: 0 };

    switch (selectedValue) {
      case "4k":
        size = { width: 3840, height: 2160 };
        break;
      case "1080":
        size = { width: 1920, height: 1080 };
        break;
      case "720":
        size = { width: 1280, height: 720 };
        break;
      case "480":
        size = { width: 720, height: 480 };
        break;
    }

    $("#widthInput").val(size.width);
    $("#heightInput").val(size.height);
    $("#layer").css(size);
  }

  setInitialSize(); // 초기 설정

  // 드롭다운 변경 시 크기 업데이트
  $("#resolutionDropdown").change(setInitialSize);
});

// 전역 변수로 현재 선택된 해상도를 저장합니다.
let currentResolution = {
  width: 1920,
  height: 1080,
};

// 해상도를 설정하는 함수
function setResolution(width, height) {
  $("#layer").css({
    width: width,
    height: height,
  });

  // 해상도에 따라 화면 크기를 조정합니다.
  adjustScreenSize(width, height);

  // 현재 선택된 해상도를 업데이트합니다.
  currentResolution.width = width;
  currentResolution.height = height;
}

// 화면 크기를 조정하는 함수
function adjustScreenSize(width, height) {
  let containerWidth = $("#container").width();
  let containerHeight = $("#container").height();

  // 레이어의 크기와 컨테이너의 크기를 비교하여 확대/축소 비율을 계산합니다.
  let scaleX = containerWidth / width;
  let scaleY = containerHeight / height;
  let scale = Math.min(scaleX, scaleY);

  // 레이어를 확대/축소합니다.
  $("#layer").css("transform", "scale(" + scale + ")");

  // 입력 필드에 너비와 높이를 표시합니다.
  $("#widthInput").val(width);
  $("#heightInput").val(height);
}

// 해상도 드롭다운의 선택 변경 이벤트를 처리합니다.
$("#resolutionDropdown").change(function () {
  let selectedValue = $(this).val();
  let width, height;

  switch (selectedValue) {
    case "4k":
      width = 3840;
      height = 2160;
      break;
    case "1080":
      width = 1920;
      height = 1080;
      break;
    case "720":
      width = 1280;
      height = 720;
      break;
    case "480":
      width = 720;
      height = 480;
      break;
  }

  // 해상도를 설정합니다.
  setResolution(width, height);
});

// 페이지가 처음 로드될 때 기본 해상도를 설정합니다.
$(document).ready(function () {
  setResolution(currentResolution.width, currentResolution.height);

  $("#resolutionDropdown").on("change", function () {
    var selectedValue = $(this).val();
    switch (selectedValue) {
      case "4k":
        $("#widthInput").val(3840);
        $("#heightInput").val(2160);
        break;
      case "1080":
        $("#widthInput").val(1920);
        $("#heightInput").val(1080);
        break;
      case "720":
        $("#widthInput").val(1280);
        $("#heightInput").val(720);
        break;
      case "480":
        $("#widthInput").val(720);
        $("#heightInput").val(480);
        break;
    }
  });

  $(".resizable-box").resizable({
    maxWidth: $("#container").width(),
    maxHeight: $("#container").height(),
  });
});

// 리사이징 박스가 복사될 때, 해당 박스의 정보를 나타내는 HTML 요소도 복사되어 표시

// 박스 복사 시 정보 박스도 복사
function copyInfoBox(sourceBox, newBox) {
  let sourceIndex = $(sourceBox).attr("data-index");
  let newIndex = $(newBox).attr("data-index");
  let sourceInfoBox = $("#infoBox" + sourceIndex).clone();
  sourceInfoBox.attr("id", "infoBox" + newIndex);
  sourceInfoBox.find("#boxX" + sourceIndex).attr("id", "boxX" + newIndex);
  sourceInfoBox.find("#boxY" + sourceIndex).attr("id", "boxY" + newIndex);
  sourceInfoBox
    .find("#boxWidth" + sourceIndex)
    .attr("id", "boxWidth" + newIndex);
  sourceInfoBox
    .find("#boxHeight" + sourceIndex)
    .attr("id", "boxHeight" + newIndex);
  $("#infoBox").append(sourceInfoBox);
  updateInfoBoxValues(newBox);
}

// 박스가 삭제될 때, 해당 박스의 정보를 나타내는 HTML 요소도 삭제

// 박스 삭제 시 정보 박스도 삭제
function deleteInfoBox(box) {
  let infoBoxId = "infoBox" + box.id.replace("box", "");
  let infoBox = document.getElementById(infoBoxId);
  if (infoBox) {
    infoBox.remove();
  }
}

// 각 리사이징 박스에 대한 InfoBox 생성
function updateInfoBox() {
  $("#infoBox").empty(); // InfoBox 컨테이너 비우기
  $(".resizable-box").each(function (index, box) {
    var boxId = "infoBox" + index;
    var boxInfo =
      '<div id="' + boxId + '"><h3>Box Information ' + (index + 1) + "</h3>";
    boxInfo +=
      '<div><label>X: <input type="number" class="boxX" value="' +
      $(box).position().left +
      '" /></label>';
    boxInfo +=
      '<label>Y: <input type="number" class="boxY" value="' +
      $(box).position().top +
      '" /></label>';
    boxInfo +=
      '<label>Width: <input type="number" class="boxWidth" value="' +
      $(box).width() +
      '" /></label>';
    boxInfo +=
      '<label>Height: <input type="number" class="boxHeight" value="' +
      $(box).height() +
      '" /></label></div></div>';
    $("#infoBox").append(boxInfo);
    bindInfoBoxEvents(boxId, $(box));
  });
}

// InfoBox 이벤트 바인딩
function bindInfoBoxEvents(infoBoxId, selectedBox) {
  $(
    "#" +
      infoBoxId +
      " .boxX, #" +
      infoBoxId +
      " .boxY, #" +
      infoBoxId +
      " .boxWidth, #" +
      infoBoxId +
      " .boxHeight"
  ).on("input", function () {
    const x = parseInt($("#" + infoBoxId + " .boxX").val(), 10);
    const y = parseInt($("#" + infoBoxId + " .boxY").val(), 10);
    const width =
      parseInt($("#" + infoBoxId + " .boxWidth").val(), 10) -
      (selectedBox.hasClass("selected") ? 2 * BORDER_WIDTH : 0);
    const height =
      parseInt($("#" + infoBoxId + " .boxHeight").val(), 10) -
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
        width + 2 * BORDER_WIDTH + "px x " + (height + 2 * BORDER_WIDTH) + "px"
      );
  });
}

function createInfoBox(box) {
  let index = $(box).attr("data-index"); // 박스의 인덱스 가져오기
  let infoBoxHTML = `<div class="infoBox" id="infoBox${index}"><h3>Box Information ${index}</h3><div><label>X: <input type="number" id="boxX${index}" /></label><label>Y: <input type="number" id="boxY${index}" /></label><label>Width: <input type="number" id="boxWidth${index}" /></label><label>Height: <input type="number" id="boxHeight${index}" /></label></div></div>`; // infoBox HTML 생성
  $("#infoBox").after(infoBoxHTML); // 기존 infoBox 아래에 새로운 infoBox 추가
  updateInfoBoxValues(box); // infoBox 값 업데이트
}

function updateInfoBoxValues(box) {
  let index = $(box).attr("data-index");
  let x = $(box).position().left;
  let y = $(box).position().top;
  let width = $(box).width();
  let height = $(box).height();
  $("#boxX" + index).val(x);
  $("#boxY" + index).val(y);
  $("#boxWidth" + index).val(width);
  $("#boxHeight" + index).val(height);
}
