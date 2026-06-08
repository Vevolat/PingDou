/**
 * 图片转拼豆设计图工具 - 核心逻辑
 * 纯前端本地处理，无网络请求
 */

// ========================================
// 拼豆标准色卡定义
// ========================================
const BEAD_COLORS = [
    // A系列 - 黄/橙系 (26色)
    { name: "浅米黄", code: "A1", r: 250, g: 244, b: 200 },
    { name: "奶油白", code: "A2", r: 255, g: 255, b: 213 },
    { name: "柠檬黄", code: "A3", r: 254, g: 255, b: 139 },
    { name: "亮黄", code: "A4", r: 251, g: 237, b: 86 },
    { name: "金黄", code: "A5", r: 244, g: 215, b: 56 },
    { name: "亮橙", code: "A6", r: 254, g: 172, b: 76 },
    { name: "橙色", code: "A7", r: 254, g: 139, b: 76 },
    { name: "金", code: "A8", r: 255, g: 218, b: 69 },
    { name: "橘橙", code: "A9", r: 255, g: 153, b: 91 },
    { name: "深橙", code: "A10", r: 247, g: 124, b: 49 },
    { name: "浅杏", code: "A11", r: 255, g: 221, b: 153 },
    { name: "肉橙", code: "A12", r: 254, g: 159, b: 114 },
    { name: "金橙", code: "A13", r: 255, g: 195, b: 101 },
    { name: "红橙", code: "A14", r: 253, g: 84, b: 61 },
    { name: "荧光黄", code: "A15", r: 255, g: 243, b: 101 },
    { name: "淡黄", code: "A16", r: 255, g: 255, b: 159 },
    { name: "鹅黄", code: "A17", r: 255, g: 227, b: 110 },
    { name: "杏色", code: "A18", r: 254, g: 190, b: 125 },
    { name: "珊瑚橙", code: "A19", r: 253, g: 124, b: 114 },
    { name: "金琥珀", code: "A20", r: 255, g: 213, b: 104 },
    { name: "浅金", code: "A21", r: 255, g: 227, b: 149 },
    { name: "黄绿", code: "A22", r: 244, g: 245, b: 125 },
    { name: "浅肉", code: "A23", r: 230, g: 201, b: 183 },
    { name: "淡黄绿", code: "A24", r: 247, g: 248, b: 162 },
    { name: "琥珀黄", code: "A25", r: 255, g: 214, b: 125 },
    { name: "琥珀", code: "A26", r: 255, g: 200, b: 48 },
    // B系列 - 绿系 (32色)
    { name: "荧光绿", code: "B1", r: 230, g: 238, b: 49 },
    { name: "亮绿", code: "B2", r: 99, g: 243, b: 71 },
    { name: "浅绿", code: "B3", r: 158, g: 247, b: 128 },
    { name: "草绿", code: "B4", r: 93, g: 224, b: 53 },
    { name: "翠绿", code: "B5", r: 53, g: 227, b: 82 },
    { name: "薄荷绿", code: "B6", r: 101, g: 226, b: 166 },
    { name: "深绿", code: "B7", r: 61, g: 175, b: 128 },
    { name: "中绿", code: "B8", r: 28, g: 156, b: 79 },
    { name: "墨绿", code: "B9", r: 39, g: 82, b: 58 },
    { name: "浅薄荷", code: "B10", r: 149, g: 211, b: 194 },
    { name: "橄榄绿", code: "B11", r: 93, g: 114, b: 42 },
    { name: "森林绿", code: "B12", r: 22, g: 111, b: 65 },
    { name: "浅草绿", code: "B13", r: 202, g: 235, b: 123 },
    { name: "嫩绿", code: "B14", r: 173, g: 233, b: 70 },
    { name: "深松绿", code: "B15", r: 46, g: 81, b: 50 },
    { name: "浅松绿", code: "B16", r: 197, g: 237, b: 156 },
    { name: "苔绿", code: "B17", r: 155, g: 177, b: 58 },
    { name: "黄绿亮", code: "B18", r: 230, g: 238, b: 73 },
    { name: "翠绿亮", code: "B19", r: 36, g: 184, b: 140 },
    { name: "薄荷白", code: "B20", r: 194, g: 240, b: 204 },
    { name: "深松绿", code: "B21", r: 21, g: 106, b: 107 },
    { name: "海军绿", code: "B22", r: 11, g: 60, b: 67 },
    { name: "深橄榄", code: "B23", r: 48, g: 58, b: 33 },
    { name: "荧光黄绿", code: "B24", r: 238, g: 252, b: 165 },
    { name: "松绿", code: "B25", r: 78, g: 132, b: 109 },
    { name: "土绿", code: "B26", r: 141, g: 122, b: 53 },
    { name: "浅橄榄", code: "B27", r: 204, g: 225, b: 175 },
    { name: "绿松", code: "B28", r: 158, g: 229, b: 185 },
    { name: "亮黄绿", code: "B29", r: 197, g: 226, b: 84 },
    { name: "浅草", code: "B30", r: 226, g: 252, b: 177 },
    { name: "草白绿", code: "B31", r: 176, g: 231, b: 146 },
    { name: "深黄绿", code: "B32", r: 156, g: 171, b: 90 },
    // C系列 - 蓝系 (29色)
    { name: "冰蓝", code: "C1", r: 232, g: 255, b: 231 },
    { name: "天蓝", code: "C2", r: 169, g: 249, b: 252 },
    { name: "浅蓝", code: "C3", r: 160, g: 226, b: 251 },
    { name: "亮蓝", code: "C4", r: 65, g: 204, b: 255 },
    { name: "钴蓝", code: "C5", r: 1, g: 172, b: 235 },
    { name: "湖蓝", code: "C6", r: 80, g: 170, b: 240 },
    { name: "宝石蓝", code: "C7", r: 54, g: 119, b: 210 },
    { name: "深蓝", code: "C8", r: 15, g: 84, b: 192 },
    { name: "蓝紫", code: "C9", r: 50, g: 75, b: 202 },
    { name: "青蓝", code: "C10", r: 62, g: 188, b: 226 },
    { name: "青色", code: "C11", r: 40, g: 221, b: 222 },
    { name: "深海军", code: "C12", r: 28, g: 51, b: 77 },
    { name: "冰白蓝", code: "C13", r: 205, g: 232, b: 255 },
    { name: "白青", code: "C14", r: 213, g: 253, b: 255 },
    { name: "绿松石", code: "C15", r: 34, g: 196, b: 198 },
    { name: "皇家蓝", code: "C16", r: 21, g: 87, b: 168 },
    { name: "亮青", code: "C17", r: 4, g: 209, b: 246 },
    { name: "深海蓝", code: "C18", r: 29, g: 51, b: 68 },
    { name: "青绿", code: "C19", r: 24, g: 135, b: 162 },
    { name: "深蓝亮", code: "C20", r: 23, g: 109, b: 175 },
    { name: "天青", code: "C21", r: 190, g: 221, b: 255 },
    { name: "灰蓝", code: "C22", r: 103, g: 180, b: 190 },
    { name: "浅蓝白", code: "C23", r: 200, g: 226, b: 255 },
    { name: "亮天蓝", code: "C24", r: 124, g: 196, b: 255 },
    { name: "冰青", code: "C25", r: 169, g: 229, b: 229 },
    { name: "中蓝", code: "C26", r: 60, g: 174, b: 216 },
    { name: "浅紫蓝", code: "C27", r: 211, g: 223, b: 250 },
    { name: "灰蓝浅", code: "C28", r: 187, g: 207, b: 237 },
    { name: "藏青", code: "C29", r: 52, g: 72, b: 142 },
    // D系列 - 紫系 (26色)
    { name: "浅紫", code: "D1", r: 174, g: 180, b: 242 },
    { name: "蓝紫", code: "D2", r: 133, g: 142, b: 221 },
    { name: "靛蓝", code: "D3", r: 47, g: 84, b: 175 },
    { name: "深蓝紫", code: "D4", r: 24, g: 42, b: 132 },
    { name: "紫罗兰", code: "D5", r: 184, g: 67, b: 197 },
    { name: "薰衣草", code: "D6", r: 172, g: 123, b: 222 },
    { name: "紫灰", code: "D7", r: 136, g: 84, b: 179 },
    { name: "淡紫", code: "D8", r: 226, g: 211, b: 255 },
    { name: "浅紫灰", code: "D9", r: 213, g: 185, b: 248 },
    { name: "深紫", code: "D10", r: 54, g: 24, b: 81 },
    { name: "紫灰浅", code: "D11", r: 185, g: 186, b: 225 },
    { name: "粉紫", code: "D12", r: 222, g: 154, b: 212 },
    { name: "洋红", code: "D13", r: 181, g: 0, b: 149 },
    { name: "紫色", code: "D14", r: 139, g: 39, b: 155 },
    { name: "靛青", code: "D15", r: 47, g: 31, b: 144 },
    { name: "紫白", code: "D16", r: 227, g: 225, b: 238 },
    { name: "冰紫", code: "D17", r: 196, g: 212, b: 246 },
    { name: "亮紫", code: "D18", r: 164, g: 94, b: 199 },
    { name: "灰紫", code: "D19", r: 216, g: 195, b: 215 },
    { name: "亮玫紫", code: "D20", r: 156, g: 50, b: 178 },
    { name: "深玫红", code: "D21", r: 154, g: 0, b: 155 },
    { name: "深蓝", code: "D22", r: 51, g: 58, b: 149 },
    { name: "浅薰衣", code: "D23", r: 235, g: 218, b: 252 },
    { name: "蓝紫亮", code: "D24", r: 119, g: 134, b: 229 },
    { name: "紫蓝", code: "D25", r: 73, g: 79, b: 199 },
    { name: "粉紫亮", code: "D26", r: 223, g: 194, b: 248 },
    // E系列 - 粉/玫红系 (24色)
    { name: "浅肤粉", code: "E1", r: 253, g: 211, b: 204 },
    { name: "粉红", code: "E2", r: 254, g: 192, b: 223 },
    { name: "亮粉", code: "E3", r: 255, g: 183, b: 231 },
    { name: "玫粉", code: "E4", r: 232, g: 100, b: 158 },
    { name: "荧光玫", code: "E5", r: 245, g: 81, b: 162 },
    { name: "玫红", code: "E6", r: 241, g: 61, b: 116 },
    { name: "深玫", code: "E7", r: 198, g: 52, b: 120 },
    { name: "粉白", code: "E8", r: 255, g: 219, b: 233 },
    { name: "亮紫玫", code: "E9", r: 233, g: 112, b: 204 },
    { name: "深玫红", code: "E10", r: 211, g: 55, b: 147 },
    { name: "肉粉", code: "E11", r: 252, g: 221, b: 210 },
    { name: "亮粉紫", code: "E12", r: 247, g: 143, b: 195 },
    { name: "紫玫红", code: "E13", r: 181, g: 0, b: 109 },
    { name: "肉色", code: "E14", r: 255, g: 209, b: 186 },
    { name: "浅粉", code: "E15", r: 248, g: 199, b: 201 },
    { name: "白粉", code: "E16", r: 255, g: 243, b: 235 },
    { name: "樱粉", code: "E17", r: 255, g: 226, b: 234 },
    { name: "淡玫", code: "E18", r: 255, g: 199, b: 219 },
    { name: "玫粉亮", code: "E19", r: 254, g: 186, b: 213 },
    { name: "灰紫粉", code: "E20", r: 216, g: 199, b: 209 },
    { name: "灰玫", code: "E21", r: 189, g: 157, b: 161 },
    { name: "灰紫玫", code: "E22", r: 183, g: 133, b: 161 },
    { name: "灰暗玫", code: "E23", r: 147, g: 122, b: 141 },
    { name: "淡紫粉", code: "E24", r: 225, g: 188, b: 232 },
    // F系列 - 红系 (25色)
    { name: "珊瑚", code: "F1", r: 253, g: 149, b: 123 },
    { name: "亮红", code: "F2", r: 252, g: 61, b: 70 },
    { name: "鲜红", code: "F3", r: 247, g: 73, b: 65 },
    { name: "红", code: "F4", r: 252, g: 40, b: 60 },
    { name: "大红色", code: "F5", r: 231, g: 0, b: 47 },
    { name: "深红", code: "F6", r: 148, g: 54, b: 48 },
    { name: "酒红", code: "F7", r: 151, g: 25, b: 55 },
    { name: "正红", code: "F8", r: 188, g: 0, b: 40 },
    { name: "粉玫瑰", code: "F9", r: 226, g: 103, b: 122 },
    { name: "棕红", code: "F10", r: 138, g: 69, b: 38 },
    { name: "暗红", code: "F11", r: 90, g: 33, b: 33 },
    { name: "荧光红", code: "F12", r: 253, g: 78, b: 106 },
    { name: "番茄红", code: "F13", r: 243, g: 87, b: 68 },
    { name: "浅玫瑰", code: "F14", r: 255, g: 169, b: 173 },
    { name: "正红亮", code: "F15", r: 211, g: 0, b: 34 },
    { name: "肉橘", code: "F16", r: 254, g: 194, b: 166 },
    { name: "浅珊瑚", code: "F17", r: 230, g: 156, b: 121 },
    { name: "棕橙", code: "F18", r: 211, g: 124, b: 70 },
    { name: "深棕红", code: "F19", r: 193, g: 68, b: 74 },
    { name: "浅暗红", code: "F20", r: 205, g: 147, b: 145 },
    { name: "玫瑰粉", code: "F21", r: 247, g: 180, b: 198 },
    { name: "粉玫亮", code: "F22", r: 253, g: 192, b: 208 },
    { name: "珊瑚亮", code: "F23", r: 246, g: 126, b: 102 },
    { name: "暗玫瑰", code: "F24", r: 230, g: 152, b: 170 },
    { name: "浅暗红", code: "F25", r: 229, g: 75, b: 79 },
    // G系列 - 棕/肉系 (21色)
    { name: "浅肉色", code: "G1", r: 255, g: 226, b: 206 },
    { name: "粉肉", code: "G2", r: 255, g: 196, b: 170 },
    { name: "杏肉", code: "G3", r: 244, g: 195, b: 165 },
    { name: "驼色", code: "G4", r: 225, g: 179, b: 131 },
    { name: "浅金", code: "G5", r: 237, g: 176, b: 69 },
    { name: "金棕", code: "G6", r: 233, g: 156, b: 23 },
    { name: "棕色", code: "G7", r: 157, g: 91, b: 62 },
    { name: "深棕", code: "G8", r: 117, g: 56, b: 50 },
    { name: "浅棕", code: "G9", r: 230, g: 180, b: 131 },
    { name: "赭石", code: "G10", r: 217, g: 140, b: 57 },
    { name: "卡其", code: "G11", r: 224, g: 197, b: 147 },
    { name: "橘棕", code: "G12", r: 255, g: 200, b: 144 },
    { name: "深肉棕", code: "G13", r: 183, g: 113, b: 74 },
    { name: "咖啡", code: "G14", r: 141, g: 97, b: 76 },
    { name: "奶白", code: "G15", r: 252, g: 249, b: 224 },
    { name: "浅驼", code: "G16", r: 242, g: 217, b: 186 },
    { name: "深咖", code: "G17", r: 120, g: 82, b: 75 },
    { name: "浅肉橙", code: "G18", r: 255, g: 228, b: 204 },
    { name: "橘棕亮", code: "G19", r: 224, g: 121, b: 53 },
    { name: "赤褐", code: "G20", r: 169, g: 64, b: 35 },
    { name: "浅棕米", code: "G21", r: 184, g: 133, b: 88 },
    // H系列 - 黑/白/灰系 (23色)
    { name: "纯白", code: "H1", r: 253, g: 251, b: 255 },
    { name: "亮白", code: "H2", r: 254, g: 255, b: 255 },
    { name: "灰紫浅", code: "H3", r: 182, g: 177, b: 186 },
    { name: "灰", code: "H4", r: 137, g: 133, b: 140 },
    { name: "深灰", code: "H5", r: 72, g: 70, b: 78 },
    { name: "炭黑", code: "H6", r: 47, g: 43, b: 47 },
    { name: "纯黑", code: "H7", r: 0, g: 0, b: 0 },
    { name: "浅粉灰", code: "H8", r: 231, g: 214, b: 219 },
    { name: "银灰", code: "H9", r: 237, g: 237, b: 237 },
    { name: "灰白", code: "H10", r: 238, g: 233, b: 234 },
    { name: "紫灰", code: "H11", r: 206, g: 205, b: 213 },
    { name: "奶白", code: "H12", r: 255, g: 245, b: 237 },
    { name: "米黄", code: "H13", r: 245, g: 236, b: 210 },
    { name: "灰绿", code: "H14", r: 207, g: 215, b: 211 },
    { name: "蓝灰", code: "H15", r: 152, g: 166, b: 168 },
    { name: "黑褐", code: "H16", r: 29, g: 20, b: 20 },
    { name: "暖灰", code: "H17", r: 241, g: 237, b: 237 },
    { name: "象牙", code: "H18", r: 255, g: 253, b: 240 },
    { name: "浅米", code: "H19", r: 246, g: 239, b: 226 },
    { name: "冷灰", code: "H20", r: 148, g: 159, b: 163 },
    { name: "浅奶油", code: "H21", r: 255, g: 251, b: 225 },
    { name: "灰银", code: "H22", r: 202, g: 202, b: 212 },
    { name: "灰绿深", code: "H23", r: 154, g: 157, b: 148 },
    // M系列 - 特殊/杂色系 (15色)
    { name: "浅灰绿", code: "M1", r: 188, g: 198, b: 184 },
    { name: "灰绿深", code: "M2", r: 138, g: 163, b: 134 },
    { name: "灰蓝", code: "M3", r: 105, g: 125, b: 128 },
    { name: "浅驼灰", code: "M4", r: 227, g: 210, b: 188 },
    { name: "灰橄榄", code: "M5", r: 208, g: 204, b: 170 },
    { name: "灰棕", code: "M6", r: 176, g: 167, b: 130 },
    { name: "灰肉", code: "M7", r: 180, g: 164, b: 151 },
    { name: "灰玫瑰", code: "M8", r: 179, g: 130, b: 129 },
    { name: "灰褐", code: "M9", r: 165, g: 135, b: 103 },
    { name: "灰紫", code: "M10", r: 197, g: 178, b: 188 },
    { name: "深灰玫", code: "M11", r: 159, g: 117, b: 148 },
    { name: "深褐灰", code: "M12", r: 100, g: 71, b: 73 },
    { name: "赭色", code: "M13", r: 209, g: 144, b: 102 },
    { name: "赤褐", code: "M14", r: 199, g: 115, b: 98 },
    { name: "冷灰", code: "M15", r: 117, g: 125, b: 120 }
];

// ========================================
// 全局状态
// ========================================
const state = {
    originalImage: null,
    originalImageData: null,
    beadGrid: null,
    gridWidth: 24,
    gridHeight: 24,
    isProcessing: false
};

// ========================================
// DOM 元素引用
// ========================================
const elements = {
    uploadArea: document.getElementById('uploadArea'),
    fileInput: document.getElementById('fileInput'),
    previewThumb: document.getElementById('previewThumb'),
    gridSize: document.getElementById('gridSize'),
    customWidthGroup: document.getElementById('customWidthGroup'),
    customHeightGroup: document.getElementById('customHeightGroup'),
    customWidth: document.getElementById('customWidth'),
    customHeight: document.getElementById('customHeight'),
    colorThreshold: document.getElementById('colorThreshold'),
    thresholdValue: document.getElementById('thresholdValue'),
    noiseRadius: document.getElementById('noiseRadius'),
    noiseValue: document.getElementById('noiseValue'),
    gridLineColor: document.getElementById('gridLineColor'),
    gridLineStyle: document.getElementById('gridLineStyle'),
    showCode: document.getElementById('showCode'),
    beadShape: document.getElementById('beadShape'),
    maxColors: document.getElementById('maxColors'),
    convertBtn: document.getElementById('convertBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    originalCanvas: document.getElementById('originalCanvas'),
    beadCanvas: document.getElementById('beadCanvas'),
    colorList: document.getElementById('colorList'),
    totalBeads: document.getElementById('totalBeads'),
    colorCount: document.getElementById('colorCount'),
    gridSizeInfo: document.getElementById('gridSizeInfo'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    // Fullscreen
    fullscreenModal: document.getElementById('fullscreenModal'),
    fullscreenCanvas: document.getElementById('fullscreenCanvas'),
    fullscreenOriginal: document.getElementById('fullscreenOriginal'),
    fullscreenBead: document.getElementById('fullscreenBead'),
    closeFullscreen: document.getElementById('closeFullscreen'),
    zoomIn: document.getElementById('zoomIn'),
    zoomOut: document.getElementById('zoomOut'),
    zoomReset: document.getElementById('zoomReset'),
    zoomValue: document.getElementById('zoomValue')
};

// ========================================
// 工具函数
// ========================================

/**
 * 计算两个RGB颜色的欧式距离
 */
function colorDistance(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
        Math.pow(r1 - r2, 2) + 
        Math.pow(g1 - g2, 2) + 
        Math.pow(b1 - b2, 2)
    );
}

/**
 * 将RGB颜色匹配到最接近的拼豆色
 */
function matchBeadColor(r, g, b) {
    let minDist = Infinity;
    let matchedColor = BEAD_COLORS[0];
    
    for (const bead of BEAD_COLORS) {
        const dist = colorDistance(r, g, b, bead.r, bead.g, bead.b);
        if (dist < minDist) {
            minDist = dist;
            matchedColor = bead;
        }
    }
    
    return { color: matchedColor, distance: minDist };
}

/**
 * RGB转Hex
 */
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

/**
 * 显示/隐藏加载状态
 */
function setLoading(visible) {
    elements.loadingOverlay.classList.toggle('active', visible);
}

// ========================================
// 上传模块
// ========================================

function initUpload() {
    // 点击上传
    elements.uploadArea.addEventListener('click', () => {
        elements.fileInput.click();
    });

    // 文件选择
    elements.fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // 拖拽上传
    elements.uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadArea.classList.add('dragover');
    });

    elements.uploadArea.addEventListener('dragleave', () => {
        elements.uploadArea.classList.remove('dragover');
    });

    elements.uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
}

function handleFile(file) {
    // 验证文件类型
    if (!file.type.match('image/(jpeg|jpg|png)')) {
        alert('请上传 JPG 或 PNG 格式的图片');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            state.originalImage = img;
            elements.previewThumb.src = e.target.result;
            elements.previewThumb.style.display = 'block';
            elements.convertBtn.disabled = false;
            
            // 显示原图预览
            drawOriginalImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function drawOriginalImage(img) {
    const canvas = elements.originalCanvas;
    const ctx = canvas.getContext('2d');
    
    // 原图完整保存（不缩放），用于后续像素化处理
    state.originalImageData = null;
    state.originalImageWidth = img.width;
    state.originalImageHeight = img.height;
    
    // 计算合适的显示尺寸（仅用于预览）
    const maxDim = 500;
    let displayWidth = img.width;
    let displayHeight = img.height;
    
    if (displayWidth > maxDim || displayHeight > maxDim) {
        const ratio = Math.min(maxDim / displayWidth, maxDim / displayHeight);
        displayWidth = Math.round(displayWidth * ratio);
        displayHeight = Math.round(displayHeight * ratio);
    }
    
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
}

// ========================================
// 图像处理核心算法
// ========================================

/**
 * 像素化：将原图压缩到网格尺寸
 */
function pixelateImageData(targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 从原始图片缩小到网格尺寸（直接使用原图，不依赖预览canvas）
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(
        state.originalImage,
        0, 0, targetWidth, targetHeight
    );
    
    return ctx.getImageData(0, 0, targetWidth, targetHeight);
}

/**
 * 去除白色/浅色背景：将接近白色的像素设为透明（alpha=0）
 * @param {ImageData} imageData - 原始像素数据
 * @param {number} tolerance - 背景容差 0-100
 * @returns {ImageData} 处理后的像素数据
 */
function removeWhiteBackground(imageData, tolerance) {
    if (tolerance <= 0) return imageData;
    
    const data = imageData.data;
    const len = data.length;
    
    for (let i = 0; i < len; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        
        // 计算像素与纯白色的距离（归一化到0-100）
        const distance = Math.sqrt(
            Math.pow(255 - r, 2) + 
            Math.pow(255 - g, 2) + 
            Math.pow(255 - b, 2)
        ) / 4.41; // 441.67 / 100
        
        if (distance < tolerance) {
            data[i + 3] = 0; // 设为完全透明
        }
    }
    
    return imageData;
}

/**
 * 颜色量化：将每个像素匹配到最接近的拼豆色
 * @param {ImageData} imageData - 像素数据
 * @param {number} threshold - 颜色简化阈值
 * @param {number} bgTolerance - 背景色容差（0表示不处理）
 */
function quantizeColors(imageData, threshold, bgTolerance) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const grid = [];
    
    // 检测背景色（四角平均值）
    let bgR = 0, bgG = 0, bgB = 0;
    if (bgTolerance > 0) {
        const corners = [
            [0, 0],
            [width - 1, 0],
            [0, height - 1],
            [width - 1, height - 1]
        ];
        for (const [cx, cy] of corners) {
            const i = (cy * width + cx) * 4;
            bgR += data[i];
            bgG += data[i + 1];
            bgB += data[i + 2];
        }
        bgR = Math.round(bgR / 4);
        bgG = Math.round(bgG / 4);
        bgB = Math.round(bgB / 4);
    }
    
    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // 如果是背景色范围内，标记为透明/背景
            let isBackground = false;
            if (bgTolerance > 0) {
                const bgDist = colorDistance(r, g, b, bgR, bgG, bgB);
                if (bgDist < bgTolerance) {
                    isBackground = true;
                }
            }
            
            // 透明像素也视为背景
            if (a < 128) {
                isBackground = true;
            }
            
            if (isBackground) {
                grid[y][x] = {
                    ...BEAD_COLORS[0], // 白色作为背景
                    isBackground: true
                };
            } else {
                // 匹配拼豆色
                const matched = matchBeadColor(r, g, b);
                grid[y][x] = {
                    ...matched.color,
                    distance: matched.distance,
                    isBackground: false
                };
            }
        }
    }
    
    // 颜色简化：合并相邻的相似色块
    if (threshold > 0) {
        simplifyColors(grid, threshold);
    }
    
    return grid;
}

/**
 * 颜色简化：将低频颜色替换为相邻高频颜色
 */
function simplifyColors(grid, threshold) {
    const height = grid.length;
    const width = grid[0].length;
    const colorCounts = countColors(grid);
    
    // 找出使用次数低于阈值的颜色
    const rareColors = new Set();
    const totalPixels = width * height;
    const minCount = Math.max(2, Math.round(totalPixels * threshold / 100));
    
    for (const [key, count] of Object.entries(colorCounts)) {
        if (count < minCount) {
            rareColors.add(key);
        }
    }
    
    if (rareColors.size === 0) return;
    
    // 替换稀有颜色
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            const key = `${cell.r},${cell.g},${cell.b}`;
            
            if (rareColors.has(key)) {
                const replacement = findNeighborColor(grid, x, y, width, height);
                if (replacement) {
                    grid[y][x] = { ...replacement };
                }
            }
        }
    }
}

/**
 * 统计颜色使用次数
 */
function countColors(grid) {
    const counts = {};
    for (const row of grid) {
        for (const cell of row) {
            const key = `${cell.r},${cell.g},${cell.b}`;
            counts[key] = (counts[key] || 0) + 1;
        }
    }
    return counts;
}

/**
 * 查找邻域最多的颜色
 */
function findNeighborColor(grid, x, y, width, height) {
    const neighbors = {};
    const radius = 2;
    
    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const cell = grid[ny][nx];
                const key = `${cell.r},${cell.g},${cell.b}`;
                neighbors[key] = (neighbors[key] || 0) + 1;
            }
        }
    }
    
    // 找最多的颜色
    let maxCount = 0;
    let bestColor = null;
    
    for (const [key, count] of Object.entries(neighbors)) {
        if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = key.split(',').map(Number);
            bestColor = matchBeadColor(r, g, b).color;
        }
    }
    
    return bestColor;
}

/**
 * 杂色去除：用邻域主色替换孤立像素
 */
function removeNoise(grid, radius) {
    if (radius === 0) return grid;
    
    const height = grid.length;
    const width = grid[0].length;
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dominantColor = getDominantNeighborColor(grid, x, y, width, height, radius);
            if (dominantColor) {
                newGrid[y][x] = { ...dominantColor };
            }
        }
    }
    
    return newGrid;
}

/**
 * 获取邻域主导颜色
 */
function getDominantNeighborColor(grid, x, y, width, height, radius) {
    const counts = {};
    let totalCount = 0;
    
    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const cell = grid[ny][nx];
                const key = `${cell.r},${cell.g},${cell.b}`;
                counts[key] = (counts[key] || 0) + 1;
                totalCount++;
            }
        }
    }
    
    // 如果当前像素颜色已经是邻域主导，不替换
    const currentKey = `${grid[y][x].r},${grid[y][x].g},${grid[y][x].b}`;
    const currentCount = counts[currentKey] || 0;
    
    if (currentCount / totalCount > 0.5) {
        return null;
    }
    
    // 找主导颜色
    let maxCount = 0;
    let dominant = null;
    
    for (const [key, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = key.split(',').map(Number);
            dominant = { r, g, b };
        }
    }
    
    // 匹配回拼豆色
    if (dominant) {
        return matchBeadColor(dominant.r, dominant.g, dominant.b).color;
    }
    
    return null;
}

/**
 * 限制颜色数：将使用次数最少的颜色替换为最接近的保留色
 */
function limitColors(grid, maxCount) {
    // 统计颜色频率
    const freq = {};
    for (const row of grid) {
        for (const cell of row) {
            const key = cell.code;
            freq[key] = (freq[key] || 0) + 1;
        }
    }
    
    const colors = Object.keys(freq);
    if (colors.length <= maxCount) return grid;
    
    // 按频率排序，保留最高频的maxCount个颜色
    const sorted = colors.sort((a, b) => freq[b] - freq[a]);
    const keepColors = new Set(sorted.slice(0, maxCount));
    
    // 将被移除的颜色映射到保留色
    const removeColors = sorted.slice(maxCount);
    const mapping = {};
    for (const rc of removeColors) {
        const bead = BEAD_COLORS.find(b => b.code === rc);
        if (bead) {
            // 找最接近的保留色
            let minDist = Infinity;
            let nearest = keepColors.values().next().value;
            for (const kc of keepColors) {
                const keepBead = BEAD_COLORS.find(b => b.code === kc);
                if (keepBead) {
                    const d = colorDistance(bead.r, bead.g, bead.b, keepBead.r, keepBead.g, keepBead.b);
                    if (d < minDist) {
                        minDist = d;
                        nearest = kc;
                    }
                }
            }
            mapping[rc] = nearest;
        }
    }
    
    // 应用映射
    const height = grid.length;
    const width = grid[0].length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            if (mapping[cell.code]) {
                const newBead = BEAD_COLORS.find(b => b.code === mapping[cell.code]);
                if (newBead) {
                    grid[y][x] = { ...newBead, isBackground: cell.isBackground };
                }
            }
        }
    }
    
    return grid;
}

/**
 * 裁剪原图白色/浅色边缘：根据容差值从原图四边裁掉空白区域
 * @param {number} tolerance - 容差 0-100
 */
function cropOriginalImage(tolerance) {
    if (!state.originalImage) return;
    
    const img = state.originalImage;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const w = img.width;
    const h = img.height;
    
    // 检测四角背景色
    const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
    let bgR = 0, bgG = 0, bgB = 0;
    for (const [cx, cy] of corners) {
        const i = (cy * w + cx) * 4;
        bgR += data[i]; bgG += data[i + 1]; bgB += data[i + 2];
    }
    bgR = Math.round(bgR / 4);
    bgG = Math.round(bgG / 4);
    bgB = Math.round(bgB / 4);
    
    // 找到内容边界（非背景像素）
    let top = h, bottom = -1, left = w, right = -1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const dist = colorDistance(data[i], data[i + 1], data[i + 2], bgR, bgG, bgB);
            if (dist > tolerance) {
                if (y < top) top = y;
                if (y > bottom) bottom = y;
                if (x < left) left = x;
                if (x > right) right = x;
            }
        }
    }
    
    // 没有有效内容，不裁剪
    if (bottom === -1) return;
    
    // 留出 2 像素余量
    top = Math.max(0, top - 2);
    left = Math.max(0, left - 2);
    bottom = Math.min(h - 1, bottom + 2);
    right = Math.min(w - 1, right + 2);
    
    // 裁剪并保存为裁剪后的canvas
    const cropW = right - left + 1;
    const cropH = bottom - top + 1;
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    cropCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);
    
    // 同步替换原图
    state.originalImage = cropCanvas;
    state.originalImageWidth = cropW;
    state.originalImageHeight = cropH;
    // 重新绘制原图预览
    drawOriginalImage(cropCanvas);
}

/**
 * 裁剪空白背景：自动去除四周纯背景的行和列
 */
function cropBackground(grid) {
    const height = grid.length;
    const width = grid[0].length;
    
    // 找到有内容的边界（非背景像素）
    let top = height, bottom = -1, left = width, right = -1;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!grid[y][x].isBackground) {
                if (y < top) top = y;
                if (y > bottom) bottom = y;
                if (x < left) left = x;
                if (x > right) right = x;
            }
        }
    }
    
    // 如果全是背景，返回 null
    if (bottom === -1) return null;
    
    // 裁剪
    const cropped = [];
    for (let y = top; y <= bottom; y++) {
        cropped.push(grid[y].slice(left, right + 1));
    }
    
    return cropped;
}

// ========================================
// 渲染模块
// ========================================

/**
 * 绘制拼豆效果图
 */
function drawBeadGrid(grid, gridLineColor, gridLineStyle, showCode, beadShape) {
    const canvas = elements.beadCanvas;
    const ctx = canvas.getContext('2d');
    const height = grid.length;
    const width = grid[0].length;
    
    // 根据屏幕宽度动态计算拼豆大小，确保移动端也能看清
    const maxWidth = Math.min(window.innerWidth - 40, 500);
    const beadSize = Math.max(10, Math.min(24, Math.floor(maxWidth / Math.max(width, height))));
    const displayWidth = width * beadSize;
    const displayHeight = height * beadSize;
    
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    // 绘制白色底背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, displayWidth, displayHeight);
    
    const isSquare = beadShape === 'square';
    const shouldShowCode = showCode === 'yes';
    const gap = isSquare ? 1 : 0.5;
    
    // 绘制每个拼豆
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            const px = x * beadSize;
            const py = y * beadSize;
            const cx = px + beadSize / 2;
            const cy = py + beadSize / 2;
            
            // 背景像素：浅色
            if (cell.isBackground) {
                ctx.fillStyle = '#f5f5f5';
                if (isSquare) {
                    ctx.fillRect(px + gap, py + gap, beadSize - gap * 2, beadSize - gap * 2);
                } else {
                    ctx.beginPath();
                    ctx.arc(cx, cy, beadSize / 2 - gap, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // 绘制拼豆
                ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
                if (isSquare) {
                    ctx.fillRect(px + gap, py + gap, beadSize - gap * 2, beadSize - gap * 2);
                } else {
                    ctx.beginPath();
                    ctx.arc(cx, cy, beadSize / 2 - gap, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // 在拼豆上显示色号
                if (shouldShowCode && beadSize >= 14) {
                    const luminance = (cell.r * 299 + cell.g * 587 + cell.b * 114) / 1000;
                    ctx.fillStyle = luminance > 140 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)';
                    
                    const fontSize = beadSize >= 20 ? 7 : 5.5;
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(cell.code, cx, cy);
                }
            }
        }
    }
    
    // 绘制网格线
    if (gridLineStyle !== 'none') {
        const lineColor = gridLineColor || 'black';
        const lineWidth = gridLineStyle === 'thick' ? 2 : 0.5;
        drawGridLines(ctx, width, height, beadSize, lineColor, lineWidth);
    }
}

/**
 * 绘制网格线
 */
function drawGridLines(ctx, width, height, beadSize, color, lineWidth) {
    const colors = {
        'black': 'rgba(0, 0, 0, 0.3)',
        'white': 'rgba(255, 255, 255, 0.5)',
        'gray': 'rgba(128, 128, 128, 0.3)'
    };
    
    ctx.strokeStyle = colors[color] || colors['black'];
    ctx.lineWidth = lineWidth || 0.5;
    
    // 垂直线
    for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(x * beadSize, 0);
        ctx.lineTo(x * beadSize, height * beadSize);
        ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * beadSize);
        ctx.lineTo(width * beadSize, y * beadSize);
        ctx.stroke();
    }
}

/**
 * 更新统计信息
 */
function updateStatistics(grid) {
    const colorStats = {};
    let totalBeads = 0;
    
    // 统计颜色（排除背景像素）
    for (const row of grid) {
        for (const cell of row) {
            if (cell.isBackground) continue;
            // 排除辅助豆 H1 H2
            if (cell.code === 'H1' || cell.code === 'H2') continue;
            const key = `${cell.code}`;
            if (!colorStats[key]) {
                colorStats[key] = {
                    ...cell,
                    count: 0
                };
            }
            colorStats[key].count++;
            totalBeads++;
        }
    }
    
    // 转换为数组并排序
    const sortedColors = Object.values(colorStats)
        .sort((a, b) => b.count - a.count);
    
    // 更新摘要
    elements.totalBeads.textContent = totalBeads;
    elements.colorCount.textContent = sortedColors.length;
    elements.gridSizeInfo.textContent = `${grid[0].length} x ${grid.length}`;
    
    // 渲染颜色清单
    renderColorList(sortedColors);
}

/**
 * 渲染颜色清单
 */
function renderColorList(colors) {
    elements.colorList.innerHTML = '';
    
    colors.forEach(color => {
        const item = document.createElement('div');
        item.className = 'color-item';
        
        const hex = rgbToHex(color.r, color.g, color.b);
        
        item.innerHTML = `
            <div class="color-swatch" style="background-color: ${hex}"></div>
            <div class="color-info">
                <div class="color-name">${color.name}</div>
                <div class="color-code">${color.code} · ${hex}</div>
            </div>
            <div class="color-count">×${color.count}</div>
        `;
        
        elements.colorList.appendChild(item);
    });
}

// ========================================
// 导出模块
// ========================================

/**
 * 生成高清PNG下载（含色号标记+行列头+颜色统计）
 */
function downloadDesign() {
    if (!state.beadGrid) return;
    
    const grid = state.beadGrid;
    const height = grid.length;
    const width = grid[0].length;
    
    // 计算拼豆大小
    const maxDim = Math.max(width, height);
    const beadSize = maxDim <= 16 ? 44 : maxDim <= 24 ? 36 : maxDim <= 32 ? 28 : maxDim <= 48 ? 22 : 16;
    
    // 计算统计面板宽度（按颜色数量）
    const colorStats = {};
    let totalBeads = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (!cell.isBackground) {
                // 排除辅助豆 H1 H2
                if (cell.code === 'H1' || cell.code === 'H2') continue;
                const key = cell.code;
                if (!colorStats[key]) {
                    colorStats[key] = { ...cell, count: 0 };
                }
                colorStats[key].count++;
                totalBeads++;
            }
        }
    }
    const sortedColors = Object.values(colorStats).sort((a, b) => b.count - a.count);
    const colorCount = sortedColors.length;
    
    // 统计面板宽度：每个颜色项约120px宽
    const statsPanelWidth = Math.max(200, Math.min(360, colorCount * 55));
    
    // 间距
    const padding = 30;
    const headerSize = 28; // 行列头宽度
    const gap = 30; // 网格和统计面板之间的间距
    
    // 总宽度 = padding + 行头 + 网格 + 间距 + 统计面板 + padding
    const gridWidth = width * beadSize;
    const gridHeight = height * beadSize;
    const canvasWidth = padding + headerSize + gridWidth + gap + statsPanelWidth + padding;
    const canvasHeight = padding + headerSize + gridHeight + padding;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // 网格起始坐标
    const offsetX = padding + headerSize;
    const offsetY = padding + headerSize;
    
    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('拼豆设计图', offsetX, padding - 6);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText(`尺寸: ${width}x${height} | 颜色数: ${colorCount} | 总拼豆数: ${totalBeads}`, offsetX + 120, padding - 6);
    
    // ==================== 绘制列头（顶部数字，每一列都显示） ====================
    ctx.fillStyle = '#666';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    for (let x = 0; x < width; x++) {
        ctx.fillText(x + 1, offsetX + x * beadSize + beadSize / 2, offsetY - 8);
    }
    
    // ==================== 绘制行头（左侧数字，每一行都显示） ====================
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = 0; y < height; y++) {
        ctx.fillText(y + 1, offsetX - 8, offsetY + y * beadSize + beadSize / 2);
    }
    
    // ==================== 绘制拼豆 ====================
    ctx.textBaseline = 'middle';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            const px = offsetX + x * beadSize;
            const py = offsetY + y * beadSize;
            const cx = px + beadSize / 2;
            const cy = py + beadSize / 2;
            const radius = beadSize / 2 - 1;
            
            // 背景像素：不绘制，跳过
            if (cell.isBackground) continue;
            
            // 绘制拼豆
            ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 非背景拼豆显示色号
            if (beadSize >= 16) {
                const luminance = (cell.r * 299 + cell.g * 587 + cell.b * 114) / 1000;
                ctx.fillStyle = luminance > 140 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)';
                
                const fontSize = beadSize >= 36 ? 9 : beadSize >= 28 ? 8 : beadSize >= 22 ? 7 : 6;
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cell.code, cx, cy);
            }
            
            // 拼豆边框
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // ==================== 绘制网格线 ====================
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 0.5;
    
    // 细线
    for (let x = 0; x <= width; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * beadSize, offsetY);
        ctx.lineTo(offsetX + x * beadSize, offsetY + gridHeight);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y++) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y * beadSize);
        ctx.lineTo(offsetX + gridWidth, offsetY + y * beadSize);
        ctx.stroke();
    }
    
    // 每5格加粗
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 5) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * beadSize, offsetY);
        ctx.lineTo(offsetX + x * beadSize, offsetY + gridHeight);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += 5) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y * beadSize);
        ctx.lineTo(offsetX + gridWidth, offsetY + y * beadSize);
        ctx.stroke();
    }
    
    // ==================== 绘制右侧颜色统计面板 ====================
    const statsX = offsetX + gridWidth + gap;
    const statsY = offsetY;
    
    // 统计面板标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('配色清单', statsX, statsY);
    
    // 统计面板边框
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    const panelHeight = canvasHeight - padding * 2 - headerSize;
    ctx.strokeRect(statsX - 5, statsY + 8, statsPanelWidth, panelHeight);
    
    // 表头
    let curY = statsY + 28;
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(statsX - 4, statsY + 9, statsPanelWidth, 18);
    
    ctx.fillStyle = '#666';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('色号', statsX + 2, curY);
    ctx.fillText('颜色', statsX + 42, curY);
    ctx.textAlign = 'right';
    ctx.fillText('数量', statsX + statsPanelWidth - 8, curY);
    
    curY += 22;
    
    // 颜色列表
    const swatchSize = 12;
    let rowIdx = 0;
    for (const color of sortedColors) {
        // 背景色交替
        if (rowIdx % 2 === 0) {
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(statsX - 4, curY - 10, statsPanelWidth, 16);
        }
        
        // 色号
        ctx.fillStyle = '#333';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(color.code, statsX + 2, curY);
        
        // 颜色方块
        const hex = rgbToHex(color.r, color.g, color.b);
        ctx.fillStyle = hex;
        ctx.fillRect(statsX + 40, curY - 7, swatchSize, swatchSize);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(statsX + 40, curY - 7, swatchSize, swatchSize);
        
        // 颜色名称
        ctx.fillStyle = '#666';
        ctx.font = '8px sans-serif';
        ctx.fillText(color.name, statsX + 56, curY);
        
        // 数量
        ctx.fillStyle = '#e89b6c';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${color.count}`, statsX + statsPanelWidth - 8, curY);
        
        curY += 16;
        rowIdx++;
        
        // 如果超出画布高度，停止绘制
        if (curY > canvasHeight - padding) break;
    }
    
    // 总计行
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(statsX - 4, curY, statsPanelWidth, 18);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('总计', statsX + 2, curY + 12);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#e89b6c';
    ctx.fillText(`${totalBeads}`, statsX + statsPanelWidth - 8, curY + 12);
    
    // ==================== 下载 ====================
    const link = document.createElement('a');
    link.download = `拼豆设计图_${width}x${height}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// ========================================
// 核心转换流程
// ========================================

async function convertToBeadDesign() {
    if (!state.originalImage || state.isProcessing) return;
    
    state.isProcessing = true;
    setLoading(true);
    
    // 使用 setTimeout 让 UI 有机会更新 loading 状态
    await new Promise(resolve => setTimeout(resolve, 50));
    
    try {
        // 确保原始图片尺寸已设置
        if (!state.originalImageWidth || !state.originalImageHeight) {
            state.originalImageWidth = state.originalImage.width;
            state.originalImageHeight = state.originalImage.height;
        }
        
        // 获取参数
        const gridSizeValue = elements.gridSize.value;
        let targetWidth, targetHeight;
        
        if (gridSizeValue === 'custom') {
            targetWidth = parseInt(elements.customWidth.value) || 24;
            targetHeight = parseInt(elements.customHeight.value) || 24;
        } else {
            // 自适应网格尺寸：根据原图宽高比选择预设
            const baseSize = parseInt(gridSizeValue);
            const imgRatio = state.originalImageWidth / state.originalImageHeight;
            targetWidth = baseSize;
            
            if (imgRatio < 1) {
                // 竖图：高度 = 宽度 + 40
                targetHeight = targetWidth + 40;
            } else {
                // 横图：高度 = 宽度 / 2 - 10
                targetHeight = Math.max(1, Math.round(targetWidth / 2 - 10));
            }
        }
        
        const threshold = parseInt(elements.colorThreshold.value);
        const noiseRadiusVal = parseInt(elements.noiseRadius.value);
        const bgTolerance = parseInt(document.getElementById('bgTolerance').value);
        const gridLineColor = elements.gridLineColor.value;
        const gridLineStyle = elements.gridLineStyle.value;
        const showCode = elements.showCode.value;
        const beadShape = elements.beadShape.value;
        const maxColorsVal = parseInt(elements.maxColors.value);
        
        console.log('转换参数:', { targetWidth, targetHeight, threshold, noiseRadiusVal, bgTolerance, maxColors: maxColorsVal });
        
        // 步骤1：上传图片进行抠图（从原图裁剪去除空白边缘）
        if (bgTolerance > 0) {
            cropOriginalImage(bgTolerance);
            console.log('原图抠图完成');
        }
        
        // 步骤2：去白底（将白色/浅色像素设为透明）
        const pixelated = pixelateImageData(targetWidth, targetHeight);
        console.log('像素化完成:', pixelated.width, pixelated.height);
        removeWhiteBackground(pixelated, bgTolerance);
        console.log('去白底完成，容差:', bgTolerance);
        
        // 步骤3：颜色量化（透明像素标记为背景）
        let grid = quantizeColors(pixelated, threshold, bgTolerance);
        console.log('颜色量化完成:', grid.length, '行');
        
        // 步骤4：杂色去除
        if (noiseRadiusVal > 0) {
            grid = removeNoise(grid, noiseRadiusVal);
        }
        
        // 步骤5：限制颜色数
        if (maxColorsVal > 0) {
            grid = limitColors(grid, maxColorsVal);
        }
        
        // 步骤6：裁剪空白背景
        const cropped = cropBackground(grid);
        if (cropped) {
            grid = cropped;
            console.log('裁剪空白背景完成');
        }
        
        // 保存结果
        state.beadGrid = grid;
        state.gridWidth = targetWidth;
        state.gridHeight = targetHeight;
        
        // 步骤7：绘制拼豆图
        drawBeadGrid(grid, gridLineColor, gridLineStyle, showCode, beadShape);
        console.log('效果图绘制完成');
        
        // 步骤8：更新统计
        updateStatistics(grid);
        
        // 更新尺寸显示
        elements.gridSizeInfo.textContent = `${grid[0].length} x ${grid.length}`;
        
        // 启用下载按钮
        elements.downloadBtn.disabled = false;
        
    } catch (error) {
        console.error('转换失败:', error);
        alert('转换失败: ' + error.message);
    } finally {
        state.isProcessing = false;
        setLoading(false);
    }
}

// ========================================
// 全屏预览
// ========================================

let fullscreenZoom = 1;
let fullscreenSourceCanvas = null;

function openFullscreen(sourceCanvas, title) {
    fullscreenSourceCanvas = sourceCanvas;
    fullscreenZoom = 1;
    elements.fullscreenCanvas.width = sourceCanvas.width;
    elements.fullscreenCanvas.height = sourceCanvas.height;
    
    // 如果是拼豆图，使用全屏专用渲染（确保色号清晰可见）
    if (title === '拼豆图' && state.beadGrid) {
        drawBeadGridFullscreen(elements.fullscreenCanvas, state.beadGrid);
    } else {
        elements.fullscreenCanvas.getContext('2d').drawImage(sourceCanvas, 0, 0);
    }
    
    elements.fullscreenCanvas.style.transform = `scale(1)`;
    elements.zoomValue.textContent = '100%';
    elements.fullscreenModal.querySelector('.fullscreen-title').textContent = title;
    elements.fullscreenModal.classList.add('active');
}

/**
 * 全屏专用拼豆图渲染（确保色号清晰）
 */
function drawBeadGridFullscreen(canvas, grid) {
    const ctx = canvas.getContext('2d');
    const height = grid.length;
    const width = grid[0].length;
    
    // 全屏模式下固定较大拼豆尺寸
    const beadSize = Math.max(18, Math.min(40, Math.floor(1200 / Math.max(width, height))));
    const displayWidth = width * beadSize;
    const displayHeight = height * beadSize;
    
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, displayWidth, displayHeight);
    
    // 绘制拼豆
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            const px = x * beadSize;
            const py = y * beadSize;
            const cx = px + beadSize / 2;
            const cy = py + beadSize / 2;
            const radius = beadSize / 2 - 1;
            
            if (cell.isBackground) continue;
            
            ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 色号（全屏下始终显示）
            const luminance = (cell.r * 299 + cell.g * 587 + cell.b * 114) / 1000;
            ctx.fillStyle = luminance > 140 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)';
            
            const fontSize = beadSize >= 30 ? 10 : beadSize >= 24 ? 9 : beadSize >= 20 ? 8 : 7;
            ctx.font = `bold ${fontSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cell.code, cx, cy);
            
            // 边框
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    // 网格线
    if (elements.gridLineStyle.value !== 'none') {
        const lineColor = elements.gridLineColor.value;
        const lineWidth = elements.gridLineStyle.value === 'thick' ? 2 : 0.5;
        drawGridLines(ctx, width, height, beadSize, lineColor, lineWidth);
    }
}

function closeFullscreenModal() {
    elements.fullscreenModal.classList.remove('active');
    fullscreenSourceCanvas = null;
}

function updateZoom() {
    if (!fullscreenSourceCanvas) return;
    elements.fullscreenCanvas.style.transform = `scale(${fullscreenZoom})`;
    elements.zoomValue.textContent = `${Math.round(fullscreenZoom * 100)}%`;
}

function initFullscreen() {
    elements.fullscreenOriginal.addEventListener('click', () => {
        openFullscreen(elements.originalCanvas, '原图');
    });
    elements.fullscreenBead.addEventListener('click', () => {
        openFullscreen(elements.beadCanvas, '拼豆图');
    });
    elements.closeFullscreen.addEventListener('click', closeFullscreenModal);
    
    // 缩放
    elements.zoomIn.addEventListener('click', () => {
        fullscreenZoom = Math.min(10, fullscreenZoom + 0.25);
        updateZoom();
    });
    elements.zoomOut.addEventListener('click', () => {
        fullscreenZoom = Math.max(0.25, fullscreenZoom - 0.25);
        updateZoom();
    });
    elements.zoomReset.addEventListener('click', () => {
        fullscreenZoom = 1;
        updateZoom();
    });
    
    // 鼠标滚轮缩放
    elements.fullscreenModal.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        fullscreenZoom = Math.max(0.25, Math.min(10, fullscreenZoom + delta));
        updateZoom();
    }, { passive: false });
    
    // ESC关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFullscreenModal();
    });
}

// ========================================
// UI 事件绑定
// ========================================

function initUI() {
    // 网格尺寸切换
    elements.gridSize.addEventListener('change', (e) => {
        const isCustom = e.target.value === 'custom';
        elements.customWidthGroup.style.display = isCustom ? 'flex' : 'none';
        elements.customHeightGroup.style.display = isCustom ? 'none' : 'none';
    });
    
    // 阈值滑块
    elements.colorThreshold.addEventListener('input', (e) => {
        elements.thresholdValue.textContent = e.target.value;
    });
    
    // 杂色滑块
    elements.noiseRadius.addEventListener('input', (e) => {
        elements.noiseValue.textContent = e.target.value;
    });
    
    // 渲染选项变化时实时重绘
    ['gridLineColor', 'gridLineStyle', 'showCode', 'beadShape'].forEach(id => {
        document.getElementById(id).addEventListener('change', () => {
            if (state.beadGrid) {
                drawBeadGrid(
                    state.beadGrid,
                    elements.gridLineColor.value,
                    elements.gridLineStyle.value,
                    elements.showCode.value,
                    elements.beadShape.value
                );
            }
        });
    });
    
    // 转换按钮
    elements.convertBtn.addEventListener('click', convertToBeadDesign);
    
    // 下载按钮
    elements.downloadBtn.addEventListener('click', downloadDesign);
}

// ========================================
// 初始化
// ========================================

function init() {
    initUpload();
    initUI();
    initFullscreen();
    console.log('图片转拼豆设计图工具已加载完成');
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}