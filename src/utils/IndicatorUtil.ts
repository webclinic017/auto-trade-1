export class IndicatorUtil {
  public static indicators = [
    {
      name: "HT_DCPERIOD",
      group: "Cycle Indicators",
      display_name: "Hilbert Transform - Dominant Cycle Period",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "HT_DCPHASE",
      group: "Cycle Indicators",
      display_name: "Hilbert Transform - Dominant Cycle Phase",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "HT_PHASOR",
      group: "Cycle Indicators",
      display_name: "Hilbert Transform - Phasor Components",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        inphase: ["Line"],
        quadrature: ["Dashed Line"],
      },
      output_names: ["inphase", "quadrature"],
    },
    {
      name: "HT_SINE",
      group: "Cycle Indicators",
      display_name: "Hilbert Transform - SineWave",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        sine: ["Line"],
        leadsine: ["Dashed Line"],
      },
      output_names: ["sine", "leadsine"],
    },
    {
      name: "HT_TRENDMODE",
      group: "Cycle Indicators",
      display_name: "Hilbert Transform - Trend vs Cycle Mode",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "ADD",
      group: "Math Operators",
      display_name: "Vector Arithmetic Add",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "DIV",
      group: "Math Operators",
      display_name: "Vector Arithmetic Div",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MAX",
      group: "Math Operators",
      display_name: "Highest value over a specified period",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MAXINDEX",
      group: "Math Operators",
      display_name: "Index of highest value over a specified period",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "MIN",
      group: "Math Operators",
      display_name: "Lowest value over a specified period",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MININDEX",
      group: "Math Operators",
      display_name: "Index of lowest value over a specified period",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "MINMAX",
      group: "Math Operators",
      display_name: "Lowest and highest values over a specified period",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        min: ["Line"],
        max: ["Line"],
      },
      output_names: ["min", "max"],
    },
    {
      name: "MINMAXINDEX",
      group: "Math Operators",
      display_name:
        "Indexes of lowest and highest values over a specified period",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        minidx: ["Line"],
        maxidx: ["Line"],
      },
      output_names: ["minidx", "maxidx"],
    },
    {
      name: "MULT",
      group: "Math Operators",
      display_name: "Vector Arithmetic Mult",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SUB",
      group: "Math Operators",
      display_name: "Vector Arithmetic Substraction",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SUM",
      group: "Math Operators",
      display_name: "Summation",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ACOS",
      group: "Math Transform",
      display_name: "Vector Trigonometric ACos",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ASIN",
      group: "Math Transform",
      display_name: "Vector Trigonometric ASin",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ATAN",
      group: "Math Transform",
      display_name: "Vector Trigonometric ATan",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "CEIL",
      group: "Math Transform",
      display_name: "Vector Ceil",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "COS",
      group: "Math Transform",
      display_name: "Vector Trigonometric Cos",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "COSH",
      group: "Math Transform",
      display_name: "Vector Trigonometric Cosh",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "EXP",
      group: "Math Transform",
      display_name: "Vector Arithmetic Exp",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "FLOOR",
      group: "Math Transform",
      display_name: "Vector Floor",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LN",
      group: "Math Transform",
      display_name: "Vector Log Natural",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LOG10",
      group: "Math Transform",
      display_name: "Vector Log10",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SIN",
      group: "Math Transform",
      display_name: "Vector Trigonometric Sin",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SINH",
      group: "Math Transform",
      display_name: "Vector Trigonometric Sinh",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SQRT",
      group: "Math Transform",
      display_name: "Vector Square Root",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TAN",
      group: "Math Transform",
      display_name: "Vector Trigonometric Tan",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TANH",
      group: "Math Transform",
      display_name: "Vector Trigonometric Tanh",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ADX",
      group: "Momentum Indicators",
      display_name: "Average Directional Movement Index",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ADXR",
      group: "Momentum Indicators",
      display_name: "Average Directional Movement Index Rating",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "APO",
      group: "Momentum Indicators",
      display_name: "Absolute Price Oscillator",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        fastperiod: 12,
        slowperiod: 26,
        matype: 0,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "AROON",
      group: "Momentum Indicators",
      display_name: "Aroon",
      function_flags: null,
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        aroondown: ["Dashed Line"],
        aroonup: ["Line"],
      },
      output_names: ["aroondown", "aroonup"],
    },
    {
      name: "AROONOSC",
      group: "Momentum Indicators",
      display_name: "Aroon Oscillator",
      function_flags: null,
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "BOP",
      group: "Momentum Indicators",
      display_name: "Balance Of Power",
      function_flags: null,
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "CCI",
      group: "Momentum Indicators",
      display_name: "Commodity Channel Index",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "CMO",
      group: "Momentum Indicators",
      display_name: "Chande Momentum Oscillator",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "DX",
      group: "Momentum Indicators",
      display_name: "Directional Movement Index",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MACD",
      group: "Momentum Indicators",
      display_name: "Moving Average Convergence/Divergence",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        fastperiod: 12,
        slowperiod: 26,
        signalperiod: 9,
      },
      output_flags: {
        macd: ["Line"],
        macdsignal: ["Dashed Line"],
        macdhist: ["Histogram"],
      },
      output_names: ["macd", "macdsignal", "macdhist"],
    },
    {
      name: "MACDEXT",
      group: "Momentum Indicators",
      display_name: "MACD with controllable MA type",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        fastperiod: 12,
        fastmatype: 0,
        slowperiod: 26,
        slowmatype: 0,
        signalperiod: 9,
        signalmatype: 0,
      },
      output_flags: {
        macd: ["Line"],
        macdsignal: ["Dashed Line"],
        macdhist: ["Histogram"],
      },
      output_names: ["macd", "macdsignal", "macdhist"],
    },
    {
      name: "MACDFIX",
      group: "Momentum Indicators",
      display_name: "Moving Average Convergence/Divergence Fix 12/26",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        signalperiod: 9,
      },
      output_flags: {
        macd: ["Line"],
        macdsignal: ["Dashed Line"],
        macdhist: ["Histogram"],
      },
      output_names: ["macd", "macdsignal", "macdhist"],
    },
    {
      name: "MFI",
      group: "Momentum Indicators",
      display_name: "Money Flow Index",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close", "volume"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MINUS_DI",
      group: "Momentum Indicators",
      display_name: "Minus Directional Indicator",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MINUS_DM",
      group: "Momentum Indicators",
      display_name: "Minus Directional Movement",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MOM",
      group: "Momentum Indicators",
      display_name: "Momentum",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "PLUS_DI",
      group: "Momentum Indicators",
      display_name: "Plus Directional Indicator",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "PLUS_DM",
      group: "Momentum Indicators",
      display_name: "Plus Directional Movement",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "PPO",
      group: "Momentum Indicators",
      display_name: "Percentage Price Oscillator",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        fastperiod: 12,
        slowperiod: 26,
        matype: 0,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ROC",
      group: "Momentum Indicators",
      display_name: "Rate of change : ((price/prevPrice)-1)*100",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ROCP",
      group: "Momentum Indicators",
      display_name: "Rate of change Percentage: (price-prevPrice)/prevPrice",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ROCR",
      group: "Momentum Indicators",
      display_name: "Rate of change ratio: (price/prevPrice)",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ROCR100",
      group: "Momentum Indicators",
      display_name: "Rate of change ratio 100 scale: (price/prevPrice)*100",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "RSI",
      group: "Momentum Indicators",
      display_name: "Relative Strength Index",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "STOCH",
      group: "Momentum Indicators",
      display_name: "Stochastic",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        fastk_period: 5,
        slowk_period: 3,
        slowk_matype: 0,
        slowd_period: 3,
        slowd_matype: 0,
      },
      output_flags: {
        slowk: ["Dashed Line"],
        slowd: ["Dashed Line"],
      },
      output_names: ["slowk", "slowd"],
    },
    {
      name: "STOCHF",
      group: "Momentum Indicators",
      display_name: "Stochastic Fast",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        fastk_period: 5,
        fastd_period: 3,
        fastd_matype: 0,
      },
      output_flags: {
        fastk: ["Line"],
        fastd: ["Line"],
      },
      output_names: ["fastk", "fastd"],
    },
    {
      name: "STOCHRSI",
      group: "Momentum Indicators",
      display_name: "Stochastic Relative Strength Index",
      function_flags: ["Function has an unstable period"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
        fastk_period: 5,
        fastd_period: 3,
        fastd_matype: 0,
      },
      output_flags: {
        fastk: ["Line"],
        fastd: ["Line"],
      },
      output_names: ["fastk", "fastd"],
    },
    {
      name: "TRIX",
      group: "Momentum Indicators",
      display_name: "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ULTOSC",
      group: "Momentum Indicators",
      display_name: "Ultimate Oscillator",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod1: 7,
        timeperiod2: 14,
        timeperiod3: 28,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "WILLR",
      group: "Momentum Indicators",
      display_name: "Williams' %R",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "BBANDS",
      group: "Overlap Studies",
      display_name: "Bollinger Bands",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 5,
        nbdevup: 2,
        nbdevdn: 2,
        matype: 0,
      },
      output_flags: {
        upperband: ["Values represent an upper limit"],
        middleband: ["Line"],
        lowerband: ["Values represent a lower limit"],
      },
      output_names: ["upperband", "middleband", "lowerband"],
    },
    {
      name: "DEMA",
      group: "Overlap Studies",
      display_name: "Double Exponential Moving Average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "EMA",
      group: "Overlap Studies",
      display_name: "Exponential Moving Average",
      function_flags: [
        "Output scale same as input",
        "Function has an unstable period",
      ],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "HT_TRENDLINE",
      group: "Overlap Studies",
      display_name: "Hilbert Transform - Instantaneous Trendline",
      function_flags: [
        "Output scale same as input",
        "Function has an unstable period",
      ],
      input_names: {
        price: "close",
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "KAMA",
      group: "Overlap Studies",
      display_name: "Kaufman Adaptive Moving Average",
      function_flags: [
        "Output scale same as input",
        "Function has an unstable period",
      ],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MA",
      group: "Overlap Studies",
      display_name: "Moving average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
        matype: 0,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MAMA",
      group: "Overlap Studies",
      display_name: "MESA Adaptive Moving Average",
      function_flags: [
        "Output scale same as input",
        "Function has an unstable period",
      ],
      input_names: {
        price: "close",
      },
      parameters: {
        fastlimit: 0.5,
        slowlimit: 0.05,
      },
      output_flags: {
        mama: ["Line"],
        fama: ["Dashed Line"],
      },
      output_names: ["mama", "fama"],
    },
    {
      name: "MAVP",
      group: "Overlap Studies",
      display_name: "Moving average with variable period",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
        periods: "periods",
      },
      parameters: {
        minperiod: 2,
        maxperiod: 30,
        matype: 0,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MIDPOINT",
      group: "Overlap Studies",
      display_name: "MidPoint over period",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MIDPRICE",
      group: "Overlap Studies",
      display_name: "Midpoint Price over period",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SAR",
      group: "Overlap Studies",
      display_name: "Parabolic SAR",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        acceleration: 0.02,
        maximum: 0.2,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SAREXT",
      group: "Overlap Studies",
      display_name: "Parabolic SAR - Extended",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {
        startvalue: 0,
        offsetonreverse: 0,
        accelerationinitlong: 0.02,
        accelerationlong: 0.02,
        accelerationmaxlong: 0.2,
        accelerationinitshort: 0.02,
        accelerationshort: 0.02,
        accelerationmaxshort: 0.2,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "SMA",
      group: "Overlap Studies",
      display_name: "Simple Moving Average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "T3",
      group: "Overlap Studies",
      display_name: "Triple Exponential Moving Average (T3)",
      function_flags: [
        "Output scale same as input",
        "Function has an unstable period",
      ],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 5,
        vfactor: 0.7,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TEMA",
      group: "Overlap Studies",
      display_name: "Triple Exponential Moving Average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TRIMA",
      group: "Overlap Studies",
      display_name: "Triangular Moving Average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "WMA",
      group: "Overlap Studies",
      display_name: "Weighted Moving Average",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "CDL2CROWS",
      group: "Pattern Recognition",
      display_name: "Two Crows",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3BLACKCROWS",
      group: "Pattern Recognition",
      display_name: "Three Black Crows",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3INSIDE",
      group: "Pattern Recognition",
      display_name: "Three Inside Up/Down",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3LINESTRIKE",
      group: "Pattern Recognition",
      display_name: "Three-Line Strike ",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3OUTSIDE",
      group: "Pattern Recognition",
      display_name: "Three Outside Up/Down",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3STARSINSOUTH",
      group: "Pattern Recognition",
      display_name: "Three Stars In The South",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDL3WHITESOLDIERS",
      group: "Pattern Recognition",
      display_name: "Three Advancing White Soldiers",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLABANDONEDBABY",
      group: "Pattern Recognition",
      display_name: "Abandoned Baby",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.3,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLADVANCEBLOCK",
      group: "Pattern Recognition",
      display_name: "Advance Block",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLBELTHOLD",
      group: "Pattern Recognition",
      display_name: "Belt-hold",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLBREAKAWAY",
      group: "Pattern Recognition",
      display_name: "Breakaway",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLCLOSINGMARUBOZU",
      group: "Pattern Recognition",
      display_name: "Closing Marubozu",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLCONCEALBABYSWALL",
      group: "Pattern Recognition",
      display_name: "Concealing Baby Swallow",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLCOUNTERATTACK",
      group: "Pattern Recognition",
      display_name: "Counterattack",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLDARKCLOUDCOVER",
      group: "Pattern Recognition",
      display_name: "Dark Cloud Cover",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.5,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLDOJI",
      group: "Pattern Recognition",
      display_name: "Doji",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLDOJISTAR",
      group: "Pattern Recognition",
      display_name: "Doji Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLDRAGONFLYDOJI",
      group: "Pattern Recognition",
      display_name: "Dragonfly Doji",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLENGULFING",
      group: "Pattern Recognition",
      display_name: "Engulfing Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLEVENINGDOJISTAR",
      group: "Pattern Recognition",
      display_name: "Evening Doji Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.3,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLEVENINGSTAR",
      group: "Pattern Recognition",
      display_name: "Evening Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.3,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLGAPSIDESIDEWHITE",
      group: "Pattern Recognition",
      display_name: "Up/Down-gap side-by-side white lines",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLGRAVESTONEDOJI",
      group: "Pattern Recognition",
      display_name: "Gravestone Doji",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHAMMER",
      group: "Pattern Recognition",
      display_name: "Hammer",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHANGINGMAN",
      group: "Pattern Recognition",
      display_name: "Hanging Man",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHARAMI",
      group: "Pattern Recognition",
      display_name: "Harami Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHARAMICROSS",
      group: "Pattern Recognition",
      display_name: "Harami Cross Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHIGHWAVE",
      group: "Pattern Recognition",
      display_name: "High-Wave Candle",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHIKKAKE",
      group: "Pattern Recognition",
      display_name: "Hikkake Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHIKKAKEMOD",
      group: "Pattern Recognition",
      display_name: "Modified Hikkake Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLHOMINGPIGEON",
      group: "Pattern Recognition",
      display_name: "Homing Pigeon",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLIDENTICAL3CROWS",
      group: "Pattern Recognition",
      display_name: "Identical Three Crows",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLINNECK",
      group: "Pattern Recognition",
      display_name: "In-Neck Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLINVERTEDHAMMER",
      group: "Pattern Recognition",
      display_name: "Inverted Hammer",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLKICKING",
      group: "Pattern Recognition",
      display_name: "Kicking",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLKICKINGBYLENGTH",
      group: "Pattern Recognition",
      display_name: "Kicking - bull/bear determined by the longer marubozu",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLLADDERBOTTOM",
      group: "Pattern Recognition",
      display_name: "Ladder Bottom",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLLONGLEGGEDDOJI",
      group: "Pattern Recognition",
      display_name: "Long Legged Doji",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLLONGLINE",
      group: "Pattern Recognition",
      display_name: "Long Line Candle",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLMARUBOZU",
      group: "Pattern Recognition",
      display_name: "Marubozu",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLMATCHINGLOW",
      group: "Pattern Recognition",
      display_name: "Matching Low",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLMATHOLD",
      group: "Pattern Recognition",
      display_name: "Mat Hold",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.5,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLMORNINGDOJISTAR",
      group: "Pattern Recognition",
      display_name: "Morning Doji Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.3,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLMORNINGSTAR",
      group: "Pattern Recognition",
      display_name: "Morning Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {
        penetration: 0.3,
      },
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLONNECK",
      group: "Pattern Recognition",
      display_name: "On-Neck Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLPIERCING",
      group: "Pattern Recognition",
      display_name: "Piercing Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLRICKSHAWMAN",
      group: "Pattern Recognition",
      display_name: "Rickshaw Man",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLRISEFALL3METHODS",
      group: "Pattern Recognition",
      display_name: "Rising/Falling Three Methods",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSEPARATINGLINES",
      group: "Pattern Recognition",
      display_name: "Separating Lines",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSHOOTINGSTAR",
      group: "Pattern Recognition",
      display_name: "Shooting Star",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSHORTLINE",
      group: "Pattern Recognition",
      display_name: "Short Line Candle",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSPINNINGTOP",
      group: "Pattern Recognition",
      display_name: "Spinning Top",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSTALLEDPATTERN",
      group: "Pattern Recognition",
      display_name: "Stalled Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLSTICKSANDWICH",
      group: "Pattern Recognition",
      display_name: "Stick Sandwich",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLTAKURI",
      group: "Pattern Recognition",
      display_name: "Takuri (Dragonfly Doji with very long lower shadow)",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLTASUKIGAP",
      group: "Pattern Recognition",
      display_name: "Tasuki Gap",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLTHRUSTING",
      group: "Pattern Recognition",
      display_name: "Thrusting Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLTRISTAR",
      group: "Pattern Recognition",
      display_name: "Tristar Pattern",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLUNIQUE3RIVER",
      group: "Pattern Recognition",
      display_name: "Unique 3 River",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLUPSIDEGAP2CROWS",
      group: "Pattern Recognition",
      display_name: "Upside Gap Two Crows",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "CDLXSIDEGAP3METHODS",
      group: "Pattern Recognition",
      display_name: "Upside/Downside Gap Three Methods",
      function_flags: ["Output is a candlestick"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        integer: ["Line"],
      },
      output_names: ["integer"],
    },
    {
      name: "AVGPRICE",
      group: "Price Transform",
      display_name: "Average Price",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["open", "high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "MEDPRICE",
      group: "Price Transform",
      display_name: "Median Price",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TYPPRICE",
      group: "Price Transform",
      display_name: "Typical Price",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "WCLPRICE",
      group: "Price Transform",
      display_name: "Weighted Close Price",
      function_flags: ["Output scale same as input"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "BETA",
      group: "Statistic Functions",
      display_name: "Beta",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {
        timeperiod: 5,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "CORREL",
      group: "Statistic Functions",
      display_name: "Pearson's Correlation Coefficient (r)",
      function_flags: null,
      input_names: {
        price0: "high",
        price1: "low",
      },
      parameters: {
        timeperiod: 30,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LINEARREG",
      group: "Statistic Functions",
      display_name: "Linear Regression",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LINEARREG_ANGLE",
      group: "Statistic Functions",
      display_name: "Linear Regression Angle",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LINEARREG_INTERCEPT",
      group: "Statistic Functions",
      display_name: "Linear Regression Intercept",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "LINEARREG_SLOPE",
      group: "Statistic Functions",
      display_name: "Linear Regression Slope",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "STDDEV",
      group: "Statistic Functions",
      display_name: "Standard Deviation",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 5,
        nbdev: 1,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TSF",
      group: "Statistic Functions",
      display_name: "Time Series Forecast",
      function_flags: ["Output scale same as input"],
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "VAR",
      group: "Statistic Functions",
      display_name: "Variance",
      function_flags: null,
      input_names: {
        price: "close",
      },
      parameters: {
        timeperiod: 5,
        nbdev: 1,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ATR",
      group: "Volatility Indicators",
      display_name: "Average True Range",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "NATR",
      group: "Volatility Indicators",
      display_name: "Normalized Average True Range",
      function_flags: ["Function has an unstable period"],
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {
        timeperiod: 14,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "TRANGE",
      group: "Volatility Indicators",
      display_name: "True Range",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "AD",
      group: "Volume Indicators",
      display_name: "Chaikin A/D Line",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close", "volume"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "ADOSC",
      group: "Volume Indicators",
      display_name: "Chaikin A/D Oscillator",
      function_flags: null,
      input_names: {
        prices: ["high", "low", "close", "volume"],
      },
      parameters: {
        fastperiod: 3,
        slowperiod: 10,
      },
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
    {
      name: "OBV",
      group: "Volume Indicators",
      display_name: "On Balance Volume",
      function_flags: null,
      input_names: {
        price: "close",
        prices: ["volume"],
      },
      parameters: {},
      output_flags: {
        real: ["Line"],
      },
      output_names: ["real"],
    },
  ];
}
