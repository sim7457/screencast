"use strict";
$(function() {
  $("#datatable-1").DataTable({
    responsive: true, //반응형 설정
    pageLength: 8, //페이지 당 글 개수 설정
    autoWidth: false,
    destroy: true,
    lengthChange: false,
    processing: true,
    serverSide: false,
    searching: false, //검색란 표시 설정
    ordering: false, //글 순서 설정
    paging: true, //페이징 표시 설정
    info: false,
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 _MENU_ 개씩 보기",
      info: "현재 _START_ - _END_ / _TOTAL_건",
      infoEmpty: "데이터 없음",
      infoFiltered: "( _MAX_건의 데이터에서 필터링됨 )",
      search: "",
      zeroRecords: "일치하는 데이터가 없습니다.",
      loadingRecords: "로딩중...",
      processing: "잠시만 기다려 주세요.",
      paginate: {
        next: "다음",
        previous: "이전",
      },
    },
     sDom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
     drawCallback: function(settings) {
      var table = settings.oInstance.api();
      var rows = table.rows({ page: 'current' }).nodes();

      // Remove existing hover event handlers
      $(rows).off('mouseenter mouseleave');

      // Add hover effect with background color
      $(rows).hover(
        function() {
          $(this).addClass('hovered');
        },
        function() {
          $(this).removeClass('hovered');
        }
      );
    }
  })

  $("#datatable-2").DataTable({
    responsive: true, //반응형 설정
    pageLength: 10, //페이지 당 글 개수 설정
    autoWidth: false,
    destroy: true,
    lengthChange: false,
    processing: true,
    serverSide: false,
    searching: false, //검색란 표시 설정
    ordering: false, //글 순서 설정
    paging: true, //페이징 표시 설정
    info: false,
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 _MENU_ 개씩 보기",
      info: "현재 _START_ - _END_ / _TOTAL_건",
      infoEmpty: "데이터 없음",
      infoFiltered: "( _MAX_건의 데이터에서 필터링됨 )",
      search: "",
      zeroRecords: "일치하는 데이터가 없습니다.",
      loadingRecords: "로딩중...",
      processing: "잠시만 기다려 주세요.",
      paginate: {
        next: "다음",
        previous: "이전",
      },
    },
     sDom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
     drawCallback: function(settings) {
      var table = settings.oInstance.api();
      var rows = table.rows({ page: 'current' }).nodes();

      // Remove existing hover event handlers
      $(rows).off('mouseenter mouseleave');

      // Add hover effect with background color
      $(rows).hover(
        function() {
          $(this).addClass('hovered');
        },
        function() {
          $(this).removeClass('hovered');
        }
      );
    }
  })


  $("#datatable-3").DataTable({
    responsive: true, //반응형 설정
    pageLength: 10, //페이지 당 글 개수 설정
    autoWidth: false,
    destroy: true,
    lengthChange: false,
    processing: true,
    serverSide: false,
    searching: false, //검색란 표시 설정
    ordering: false, //글 순서 설정
    paging: true, //페이징 표시 설정
    info: false,
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 _MENU_ 개씩 보기",
      info: "현재 _START_ - _END_ / _TOTAL_건",
      infoEmpty: "데이터 없음",
      infoFiltered: "( _MAX_건의 데이터에서 필터링됨 )",
      search: "",
      zeroRecords: "일치하는 데이터가 없습니다.",
      loadingRecords: "로딩중...",
      processing: "잠시만 기다려 주세요.",
      paginate: {
        next: "다음",
        previous: "이전",
      },
    },
     sDom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
     drawCallback: function(settings) {
      var table = settings.oInstance.api();
      var rows = table.rows({ page: 'current' }).nodes();

      // Remove existing hover event handlers
      $(rows).off('mouseenter mouseleave');

      // Add hover effect with background color
      $(rows).hover(
        function() {
          $(this).addClass('hovered');
        },
        function() {
          $(this).removeClass('hovered');
        }
      );
    }
  })


  $("#datatable-4").DataTable({
    responsive: true, //반응형 설정
    pageLength: 9, //페이지 당 글 개수 설정
    autoWidth: false,
    destroy: true,
    lengthChange: false,
    processing: true,
    serverSide: false,
    searching: false, //검색란 표시 설정
    ordering: false, //글 순서 설정
    paging: true, //페이징 표시 설정
    info: false,
    language: {
      emptyTable: "데이터가 없습니다.",
      lengthMenu: "페이지당 _MENU_ 개씩 보기",
      info: "현재 _START_ - _END_ / _TOTAL_건",
      infoEmpty: "데이터 없음",
      infoFiltered: "( _MAX_건의 데이터에서 필터링됨 )",
      search: "",
      zeroRecords: "일치하는 데이터가 없습니다.",
      loadingRecords: "로딩중...",
      processing: "잠시만 기다려 주세요.",
      paginate: {
        next: "다음",
        previous: "이전",
      },
    },
     sDom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
     drawCallback: function(settings) {
      var table = settings.oInstance.api();
      var rows = table.rows({ page: 'current' }).nodes();

      // Remove existing hover event handlers
      $(rows).off('mouseenter mouseleave');

      // Add hover effect with background color
      $(rows).hover(
        function() {
          $(this).addClass('hovered');
        },
        function() {
          $(this).removeClass('hovered');
        }
      );
    }
  })


});
