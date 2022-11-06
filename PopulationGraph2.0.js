let aslider;
let rslider;


function setup() {
  createCanvas(800, 1000);


  //////// CHANGES YOU CAN MAKE //////////////////
  //starting slider values of a and r
  al = 0.8
  rl = 2.6

  //number of data points
  ndat = 30

  //can slider access 0 and 1?
  edg = false

  //limit of r slider
  limr = 7

  //number of iterations to get value in graph 2
  liva = 50

  //number of overlapped lines on graph 2
  ovl = 20

  // lines on graph 2
  lin = false
  
  //scale on x axis of graph 2
  gra2scal = 0.5
  
  //limit on x axis of graph 2
  limi=4.5

  width1 = 400
  height1 = 400

  stor = []

  axrat = 9
  axhe = (axrat - 1) / axrat

  nwid = width1 * axhe
  nhei = height1 * axhe

  nwh = height1 + 100
  li = limi * 10
  
  au = 0.5


  ofs = 5
  of2=2
  cofs = 3

  if (edg) {
    aslider = createSlider(0, 1, al, 0.01)
  } else {
    aslider = createSlider(0.01, 0.99, al, 0.01)
  }
  aslider.position(width1 - 120, 5)
  aslider.style('width', '100px')

  rslider = createSlider(0, limr, rl, 0.1)
  rslider.position(width1 - 120, 25)
  rslider.style('width', '100px')
  
  ar=[]
  for (let i = 0; i < ovl; i++) {
    ar[i]=[]
    cal(liva+i, ar[i])
  }
}

function draw() {
  background(240);
  translate(0, 5)
  calc(ndat)

  grap()
  tec()
}

function grap() {
  //Graph 1
  line(width1 / axrat, 0, width1 / axrat, height1 * axhe)
  line(width1 / axrat, height1 * axhe, width1, height1 * axhe)

  fill(0)
  for (let i = 0; i < ndat; i++) {
    if ((stor[i] > -0.3) && (stor[i] < 1)) {
      circle(nwid / ndat * i + width1 / axrat, height1 * axhe - stor[i] * nhei, cofs)
      if (i != 0) {
        line(nwid / ndat * (i - 1) + width1 / axrat, height1 * axhe - stor[i - 1] * nhei, nwid / ndat * i + width1 / axrat, height1 * axhe - stor[i] * nhei)
      }
    }
  }

  //Graph 2
  line(width1 / axrat, nwh, width1 / axrat, nwh + height1 * axhe)
  line(width1 / axrat, nwh + height1 * axhe, width1, nwh + height1 * axhe)

  for (let y = 0; y < ovl; y++) {
    t = ar[y]
    for (let i = 0; i < t.length; i++) {
      if ((t[i][1] < nwh + width1 * axhe) && (t[i][1] > nwh)) {
        circle(t[i][0], t[i][1], cofs)
        if (i != 0) {
          if (lin) {
            line(t[i - 1][0], t[i - 1][1], t[i][0], t[i][1])
          }
        }
      }
    }
  }
}

function tec() {
  //X axis
  for (let i = 0; i <= ndat; i++) {
    line(nwid / ndat * i + width1 / axrat, height1 * axhe, nwid / ndat * i + width1 / axrat, height1 * axhe + ofs)
    textSize(8)
    textAlign(CENTER, TOP)
    text(i, nwid / ndat * i + width1 / axrat, height1 * axhe + ofs+of2)
  }

  //Y axis
  for (let i = 0; i <= 10; i++) {
    line(width1 / axrat, height1 * axhe - nhei * (i / 10), width1 / axrat - ofs, height1 * axhe - nhei * (i / 10))
    textAlign(RIGHT, CENTER)
    text(i / 10, width1 / axrat - ofs-of2, height1 * axhe - nhei * (i / 10))
  }
  textSize(10)
  textAlign(RIGHT, TOP)
  text('a=' + aslider.value(), width1 - 130, 7)
  textAlign(RIGHT, TOP)
  text('r=' + rslider.value(), width1 - 130, 27)

  //X axis 2
  for (let i = 0; i <= li; i += gra2scal) {
    line(nwid / li * i + width1 / axrat, nwh + height1 * axhe, nwid / li * i + width1 / axrat, nwh + height1 * axhe + ofs)
    textSize(8)
    textAlign(CENTER, TOP)
    text(i / 10, nwid / li * i + width1 / axrat, nwh + height1 * axhe + ofs+of2)
  }

  //Y axis 2
  for (let i = 0; i <= 10; i++) {
    line(width1 / axrat, nwh + height1 * axhe - nhei * (i / 10), width1 / axrat - ofs, nwh + height1 * axhe - nhei * (i / 10))
    textAlign(RIGHT, CENTER)
    text(i / 10, width1 / axrat - ofs-of2, nwh + height1 * axhe - nhei * (i / 10))
  }
}

function calc(z) {
  stor = [aslider.value()]
  ta = aslider.value()
  for (let i = 1; i < z; i++) {
    stor[i] = rslider.value() * ta * (1 - ta)
    ta = stor[i]
  }
}

function cal(z, x) {
  for (let i = 0; i <= li; i += gra2scal) {
    gh = au
    for (let j = 0; j <= z; j++) {
      gh = i / 10 * gh * (1 - gh)
    }
    x.push([nwid / li * i + width1 / axrat, nwh + height1 * axhe - gh * nhei])
    gh = 0
  }
}
