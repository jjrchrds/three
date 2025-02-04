varying vec2 vUv;

void main()
{
    //p3 x grad
    // float strength = vUv.x;

    //p4 y grad
    // float strength = vUv.y;

    //p5
    // float strength = 1.0 - vUv.y;
 
    //p6
    // float strength = mod(vUv.y * 10.0, 1.0);

    //p7
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    //p8
    // float strength = step(0.2, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    float x = abs(vUv.x - 0.5);
    float y = abs(vUv.y - 0.5);
    float strength = max(x, y);
    strength = step(0.2, strength);
    
  
    // strength = step(0.5, strength);
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}